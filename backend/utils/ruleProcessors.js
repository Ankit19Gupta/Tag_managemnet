import Product from '../models/Product.js';
import { addTagToProduct, removeTagFromProduct } from './tagUtils.js';
import { daysAgo } from './dateUtils.js';

export const processRule = async (rule, product = null) => {
  const processors = {
    JUSTIN_RILE: async (rule) => {
      const res = { applied: 0, removed: 0, details: [] };
      const days = rule.options?.publishWithinDays ?? 0;
      const cutoff = daysAgo(days);

      const products = product
        ? [product]
        : await Product.find({
            published: true,
            publishDate: { $gte: cutoff },
          });

      for (const p of products) {
        const applied = await addTagToProduct(p, rule.tagName, rule);
        if (applied) res.applied++;
        res.details.push({ productId: p._id, applied });
      }
      return res;
    },

    BEST_SELLER: async (rule) => {
      const res = { applied: 0, removed: 0, details: [] };
      const period = rule.options?.periodDays ?? 7;
      const cutoff = daysAgo(period);
      const minSold = rule.options?.minSold ?? 1;
      const loc = rule.options?.locationFilter || {};

      const products = product
        ? [product]
        : await Product.find({
            'salesHistory.date': { $gte: cutoff },
          });

      for (const p of products) {
        let soldCount = 0;
        for (const s of p.salesHistory || []) {
          if (s.date >= cutoff) {
            const matchesLoc =
              (!loc.country || s.location?.country === loc.country) &&
              (!loc.state || s.location?.state === loc.state) &&
              (!loc.city || s.location?.city === loc.city);
            if (matchesLoc) soldCount += s.quantity || 0;
          }
        }

        if (soldCount >= minSold) {
          const applied = await addTagToProduct(p, rule.tagName, rule);
          if (applied) res.applied++;
          res.details.push({ productId: p._id, soldCount, applied });
        }
      }
      return res;
    },

    LIMITED_UNITS_LEFT: async (rule) => {
      const res = { applied: 0, removed: 0, details: [] };
      const threshold = rule.options?.threshold ?? 5;

      const products = product
        ? [product]
        : await Product.find({ inventory: { $lte: threshold } });

      for (const p of products) {
        const applied = await addTagToProduct(p, rule.tagName, rule);
        if (applied) res.applied++;
        res.details.push({ productId: p._id, inventory: p.inventory, applied });
      }

      if (!product) {
        const taggedProducts = await Product.find({ tags: rule.tagName });
        for (const p of taggedProducts) {
          if (p.inventory > threshold) {
            const removed = await removeTagFromProduct(
              p,
              rule.tagName,
              rule,
              'inventory_replenished'
            );
            if (removed) res.removed++;
            res.details.push({
              productId: p._id,
              inventory: p.inventory,
              removed: !!removed,
            });
          }
        }
      }

      return res;
    },
 
    MISSPELT_TAGS: async (rule) => {
      const res = { applied: 0, removed: 0, details: [] };
      const shopifySearchTerms = await fetchShopifySearchTerms(
        rule.options?.shopifyConfig
      );
      const gscQueries = await fetchGSCQueries(rule.options?.gscConfig);
      const suggestions = new Set([
        ...(rule.options?.customTags || []),
        ...shopifySearchTerms,
        ...gscQueries,
      ]);

      for (const suggested of suggestions) {
        const regex = new RegExp(escapeRegExp(suggested), 'i');
        const products = product
          ? [product]
          : await Product.find({
              $or: [{ title: regex }, { description: regex }, { sku: regex }],
            }).limit(200);

        for (const p of products) {
          const fullTag = suggested;
          const applied = await addTagToProduct(p, fullTag, rule);
          if (applied) res.applied++;
          res.details.push({ productId: p._id, tag: fullTag, applied });
        }
      }
      return res;
    },

    AI_SUGGESTED_TAGS: async (rule) => {
      const res = { applied: 0, removed: 0, details: [] };
      const maxTags = rule.options?.maxTags ?? 10;

      const products = product ? [product] : await Product.find({});

      for (const p of products) {
        const candidateTags = await suggestTagsFromProduct(p, maxTags);
        res.details.push({ productId: p._id, suggested: candidateTags });
        if (rule.options?.autoApply) {
          for (const tag of candidateTags) {
            const applied = await addTagToProduct(p, tag, rule);
            if (applied) res.applied++;
          }
        }
      }
      return res;
    },
  };

  const processor = processors[rule.ruleType];
  if (!processor) {
    throw new Error('No processor for rule type ' + rule.ruleType);
  }
  return processor(rule);
};

async function fetchShopifySearchTerms(config) {
  // TODO: Replace with real Shopify analytics/search suggestions integration
  return ['iphon', 'smasung', 'nikon d8100'];
}

async function fetchGSCQueries(config) {
  // TODO: Use GSC API to pull queries with low CTR
  return ['samsang', 'iphnoe'];
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function suggestTagsFromProduct(product, maxTags = 10) {
  const text = `${product.title || ''} ${product.description || ''}`.toLowerCase();
  const tokens = text.split(/\W+/).filter((t) => t.length > 2);
  const freq = {};
  for (const t of tokens) freq[t] = (freq[t] || 0) + 1;
  const sorted = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxTags)
    .map((x) => x[0]);
  return sorted.filter((s) => /\D/.test(s));
}