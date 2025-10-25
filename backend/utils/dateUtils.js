export function daysAgo(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}