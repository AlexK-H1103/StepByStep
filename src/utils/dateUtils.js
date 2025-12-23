export const getLocalDateKey = (date = new Date()) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const dateKeyToDate = (key) => {
  if (typeof key !== "string") return null;
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const getPrevDateKey = (key) => {
  const d = dateKeyToDate(key);
  if (!d) return null;
  d.setDate(d.getDate() - 1);
  return getLocalDateKey(d);
};

export const getDaysLeft = (dueDate) => {
  if (!dueDate) return null;

  const today = dateKeyToDate(getLocalDateKey());
  const target = dateKeyToDate(dueDate);

  if (!target) return null;

  const diff = target - today;
  return Math.ceil(diff / 86400000);
};

export const getDeadlineColor = (dueDate) => {
  const days = getDaysLeft(dueDate);

  if (days === null) return "text-gray-500";
  if (days <= 3) return "text-error";
  if (days <= 7) return "text-warning";
  return "text-gray-300";
};
