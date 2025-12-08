export const useDate = () => {
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().slice(0, 10);
  };

  const parseDate = (str) => {
    if (!str) return null;
    const [y, m, d] = str.split("-");
    return new Date(y, m - 1, d);
  };

  const getToday = () => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  };

  const getTodayKey = () => formatDate(getToday());

  const getDaysLeft = (dueDate) => {
    if (!dueDate) return null;

    const today = getToday();
    const target = new Date(dueDate);
    target.setHours(0, 0, 0, 0);

    const diff = target - today;
    return Math.ceil(diff / 86400000);
  };

  const getDeadlineColor = (dueDate) => {
    const days = getDaysLeft(dueDate);

    if (days === null) return "text-gray-500";
    if (days <= 3) return "text-error";
    if (days <= 7) return "text-warning";

    return "text-gray-300";
  };

  return {
    formatDate,
    parseDate,
    getToday,
    getTodayKey,
    getDaysLeft,
    getDeadlineColor,
  };
};
