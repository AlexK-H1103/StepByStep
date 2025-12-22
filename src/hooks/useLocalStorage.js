import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue, sanitize = (v) => v) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      const parsed = raw ? JSON.parse(raw) : initialValue;
      return sanitize(parsed);
    } catch (e) {
      console.error("Failed to read from localStorage", e);
      return sanitize(initialValue);
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  }, [key, state]);

  return [state, setState];
}
