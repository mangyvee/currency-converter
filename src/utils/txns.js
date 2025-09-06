const KEY = "monei.txns";

export function addTxn(txn) {
  // txn: { from, to, amount, result, rate, at: Date.toISOString() }
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || "[]");
    list.unshift(txn);
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 10)));
  } catch {}
}

export function getTxns(limit = 5) {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || "[]");
    return list.slice(0, limit);
  } catch {
    return [];
  }
}

export const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
};
