import { useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useDailyStorage = () => {
  const [daily, setDaily] = useLocalStorage("daily", {
    todos: [],
    log: "",
  });

  const { todos, log } = daily;

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };
    setDaily((prev) => ({
      ...prev,
      todos: [...prev.todos, newTodo],
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
    setDaily((prev) => ({
      ...prev,
      log: text,
    }));
  };

  useEffect(() => {
    const fixedDaily = {
      todos: Array.isArray(daily.todos) ? daily.todos : [],
      log: typeof daily.log === "string" ? daily.log : "",
    };

    if (JSON.stringify(fixedDaily) !== JSON.stringify(daily)) {
      setDaily(fixedDaily);
    }
  }, [daily]);

  return {
    todos,
    log,
    addTodo,
    toggleTodo,
    removeTodo,
    setLog,
  };
};
