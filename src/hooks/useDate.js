import { useState, useCallback } from "react";

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDate(dateString) {
  if (!dateString) return null;
  const [year, month, day] = dateString.split("-");
  return new Date(year, month - 1, day);
}

export const useDate = () => {
  const getToday = useCallback(() => {
    const now = new Date();
    const jstOffset = 9 * 60;
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const jstTime = utc + jstOffset * 60000;
    const jst = new Date(jstTime);
    jst.setHours(0, 0, 0, 0);
    return jst;
  }, []);

  const [selectedDate, setSelectedDate] = useState(getToday());

  const resetToToday = useCallback(() => {
    setSelectedDate(getToday());
  }, [getToday]);

  const getDaysLeft = useCallback(
    (dueDate) => {
      if (!dueDate) return null;

      const today = getToday();
      const target = new Date(dueDate);
      target.setHours(0, 0, 0, 0);

      const diff = target - today;
      return Math.ceil(diff / (1000 * 60 * 60 * 24));
    },
    [getToday]
  );

  const getDeadlineColor = useCallback(
    (dueDate) => {
      const days = getDaysLeft(dueDate);

      if (days === null) return "text-base-content/30";
      if (days <= 3) return "text-error";
      if (days <= 7) return "text-warning";

      return "text-base-content";
    },
    [getDaysLeft]
  );

  return {
    selectedDate,
    setSelectedDate,
    today: getToday(),
    formatDate,
    parseDate,
    resetToToday,
    getDaysLeft,
    getDeadlineColor,
  };
};
