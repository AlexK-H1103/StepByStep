import { useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { parseDate } from "../utils/dateUtils";
import { generateId } from "../utils/generatedId";
import { sanitizeDailyStorage } from "../utils/sanitizeData";

const formatDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

const getToday = () => formatDate(new Date());

const initialValue = {
  current: {
    date: getToday(),
    todos: [],
    log: "",
    isDone: false,
  },
  history: {},
};

export const useDailyStorage = () => {
  const [data, setData] = useLocalStorage(
    "daily",
    initialValue,
    sanitizeDailyStorage
  );

  const { current: daily, history } = data;
  const { todos, log } = daily;

  useEffect(() => {
    const today = getToday();

    if (daily.date !== today) {
      setData((prev) => ({
        current: {
          date: today,
          todos: [],
          log: "",
          isDone: false,
        },
        history: {
          ...prev.history,
          [daily.date]: prev.current,
        },
      }));
    }
  }, [daily.date, setData]);

  const addTodo = (text) => {
    if (!text.trim()) return;

    setData((prev) => ({
      ...prev,
      current: {
        ...prev.current,
        todos: [
          ...prev.current.todos,
          {
            id: generateId(),
            text: text.trim(),
            completed: false,
            createdAt: Date.now(),
          },
        ],
      },
    }));
  };

  const toggleTodo = (id) => {
    setData((prev) => ({
      ...prev,
      current: {
        ...prev.current,
        todos: prev.current.todos.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        ),
      },
    }));
  };

  const removeTodo = (id) => {
    setData((prev) => ({
      ...prev,
      current: {
        ...prev.current,
        todos: prev.current.todos.filter((t) => t.id !== id),
      },
    }));
  };

  const setLog = (text) => {
    setData((prev) => ({
      ...prev,
      current: {
        ...prev.current,
        log: text,
        isDone: text.trim().length > 0,
      },
    }));
  };

  const loggedDates = useMemo(() => {
    const dates = [];

    if (daily.isDone) {
      dates.push(parseDate(daily.date));
    }

    Object.entries(history).forEach(([date, entry]) => {
      if (entry.isDone) {
        dates.push(parseDate(date));
      }
    });

    return dates;
  }, [daily, history]);

  const streak = useMemo(() => {
    let count = 0;
    let date = daily.log.trim()
      ? daily.date
      : (() => {
          const d = parseDate(daily.date);
          d.setDate(d.getDate() - 1);
          return formatDate(d);
        })();

    while (true) {
      const entry = date === daily.date ? daily : history[date];
      if (!entry || !entry.log?.trim()) break;

      count++;

      const d = parseDate(date);
      d.setDate(d.getDate() - 1);
      date = formatDate(d);
    }

    return count;
  }, [daily, history]);

  return {
    daily,
    todos,
    log,
    history,
    addTodo,
    toggleTodo,
    removeTodo,
    setLog,
    loggedDates,
    streak,
  };
};
