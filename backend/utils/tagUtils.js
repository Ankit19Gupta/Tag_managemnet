import TagLog from '../models/TagRule.js';

export async function addTagToProduct(product, tag, rule) {
  if (!product.tags) product.tags = [];
  if (!product.tags.includes(tag)) {
    product.tags.push(tag);
    await product.save();
    await TagLog.create({
      ruleId: rule._id,
      productId: product._id,
      tag,
      action: 'APPLIED',
    });
    return true;
  }
  return false;
}

export async function removeTagFromProduct(product, tag, rule, reason) {
  if (product.tags && product.tags.includes(tag)) {
    product.tags = product.tags.filter((t) => t !== tag);
    await product.save();
    await TagLog.create({
      ruleId: rule._id,
      productId: product._id,
      tag,
      action: 'REMOVED',
      meta: { reason },
    });
    return true;
  }
  return false;
}

export async function scheduleTimeBasedRemoval(rule) {
  const afterDays = rule.autoRemove.afterDays;
  if (!afterDays) return;

  const cutoff = daysAgo(afterDays);
  const appliedLogs = await TagLog.find({
    ruleId: rule._id,
    action: 'APPLIED',
    at: { $lte: cutoff },
  });

  for (const log of appliedLogs) {
    try {
      const prod = await Product.findById(log.productId);
      if (prod) {
        await removeTagFromProduct(prod, log.tag, rule, 'time_based_auto_remove');
      }
    } catch (err) {
      console.error('Error during time-based removal', err);
    }
  }
}

function daysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}