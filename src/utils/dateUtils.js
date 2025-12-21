export const getDaysLeft = (dueDate) => {
  if (!dueDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dueDate);
  target.setHours(0, 0, 0, 0);

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
