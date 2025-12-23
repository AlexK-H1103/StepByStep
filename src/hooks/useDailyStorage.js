import { useEffect, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import {
  getLocalDateKey,
  getPrevDateKey,
  dateKeyToDate,
} from "../utils/dateUtils";
import { sanitizeDailyStorage } from "../utils/sanitizeData";

const initialValue = {
  current: {
    date: getLocalDateKey(),
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

  useEffect(() => {
    const today = getLocalDateKey();

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
          [prev.current.date]: prev.current,
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
            id: crypto.randomUUID(),
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
      dates.push(dateKeyToDate(daily.date));
    }

    Object.entries(history).forEach(([date, entry]) => {
      if (entry.isDone) {
        dates.push(dateKeyToDate(date));
      }
    });

    return dates;
  }, [daily.isDone, daily.date, history]);

  const streak = useMemo(() => {
    let count = 0;
    let dateKey = daily.isDone ? daily.date : getPrevDateKey(daily.date);

    while (dateKey) {
      const entry = dateKey === daily.date ? daily : history[dateKey];

      if (!entry?.isDone) break;

      count++;
      dateKey = getPrevDateKey(dateKey);
    }

    return count;
  }, [daily, history]);

  return {
    daily,
    history,
    addTodo,
    toggleTodo,
    removeTodo,
    setLog,
    loggedDates,
    streak,
  };
};
