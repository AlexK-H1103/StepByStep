import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useDailyStorage = () => {
  const [daily, setDaily] = useLocalStorage("daily", {
    date: "",
    todos: [],
    log: "",
  });

  const { todos, log } = daily;

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    if (daily.date !== today) {
      setDaily({
        date: today,
        todos: [],
        log: "",
      });
    }
  }, []);

  const addTodo = (text) => {
    setDaily((prev) => ({
      ...prev,
      todos: [
        ...prev.todos,
        {
          id: crypto.randomUUID(),
          text,
          completed: false,
          createdAt: Date.now(),
        },
      ],
    }));
  };

  const toggleTodo = (id) => {
    setDaily((prev) => ({
      ...prev,
      todos: prev.todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    }));
  };

  const removeTodo = (id) => {
    setDaily((prev) => ({
      ...prev,
      todos: prev.todos.filter((t) => t.id !== id),
    }));
  };

  const setLog = (text) => {
    setDaily((prev) => ({ ...prev, log: text }));
  };

  useEffect(() => {
    if (!Array.isArray(daily.todos) || typeof daily.log !== "string") {
      setDaily({
        ...daily,
        todos: Array.isArray(daily.todos) ? daily.todos : [],
        log: typeof daily.log === "string" ? daily.log : "",
      });
    }
  }, [daily]);

  return {
    daily,
    todos,
    log,
    addTodo,
    toggleTodo,
    removeTodo,
    setLog,
  };
};
