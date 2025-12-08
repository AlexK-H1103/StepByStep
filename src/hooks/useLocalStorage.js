import { useState, useEffect } from "react";

const isLocalStorageAvailable = () => {
  try {
    const testKey = "__storage_test__";
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

export function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(() => {
    if (!isLocalStorageAvailable()) {
      return initialValue;
    }
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        return JSON.parse(raw);
      } else {
        localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      }
    } catch (e) {
      console.error("useLocalStorage parse error for key", key, e);
      return initialValue;
    }
  });

  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      console.warn("LocalStorage is not available.");
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error("useLocalStorage setItem error for key", key, e);
    }
  }, [key, state]);

  return [state, setState];
}
