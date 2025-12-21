import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { generateId } from "../utils/generatedId";

const getToday = () => new Date().toISOString().slice(0, 10);
const createDaily = (daily = {}) => ({
  date: daily.date ?? getToday(),
  todos: Array.isArray(daily.todos) ? daily.todos : [],
  log: daily.log ?? "",
  isDone: !!daily.isDone,
});

export const useDailyStorage = () => {
  const [data, setData] = useLocalStorage("daily", {
    current: createDaily(),
    history: {},
  });

  const daily = data.current;
  const todos = daily.todos;
  const log = daily.log;

  useEffect(() => {
    const today = getToday();
    if (daily.date !== today) {
      setData((prev) => ({
        current: createDaily(today),
        history: {
          ...prev.history,
          [daily.date]: { ...daily },
        },
      }));
    }
  }, [daily.date, setData]);

  const addTodo = (text) => {
    setData((prev) => ({
      ...prev,
      current: {
        ...prev.current,
        todos: [
          ...prev.current.todos,
          {
            id: generateId(),
            text,
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
      current: { ...prev.current, log: text, isDone: text.trim().length > 0 },
    }));
  };

  const getLoggedDateObjects = () => {
    const dates = [];

    if (daily.isDone) {
      dates.push(new Date(daily.date));
    }

    for (const [date, entry] of Object.entries(data.history)) {
      if (entry.isDone) {
        dates.push(new Date(date));
      }
    }

    return dates;
  };

  const calculateStreak = () => {
    const today = getToday();
    const history = data.history;

    let count = 0;
    let date = today;

    while (true) {
      const entry = date === daily.date ? daily : history[date];

      if (!entry || !entry.log.trim()) break;

      count++;

      const d = new Date(date);
      d.setDate(d.getDate() - 1);
      date = d.toISOString().slice(0, 10);
    }

    return count;
  };

  return {
    daily,
    todos,
    log,
    addTodo,
    toggleTodo,
    removeTodo,
    setLog,
    loggedDates: getLoggedDateObjects(),
    history: data.history,
    streak: calculateStreak(),
  };
};
