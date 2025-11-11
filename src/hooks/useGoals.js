import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export const useGoals = () => {
  const [goals, setGoals] = useLocalStorage("goals", []);

  const addGoal = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
  };

  const removeGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const updateGoal = (updated) => {
    setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
  };

  const findGoal = (id) => goals.find((g) => g.id === id);

  const calculateProgress = (goal) => {
    if (!goal || !goal.steps || goal.steps.length === 0)
      return goal?.completed ? 100 : 0;
    const completed = goal.steps.filter((s) => s.completed).length;
    return Math.round((completed / goal.steps.length) * 100);
  };

  const progressMap = useMemo(() => {
    const map = {};
    goals.forEach((g) => (map[g.id] = calculateProgress(g)));
    return map;
  }, [goals]);

  return {
    goals,
    addGoal,
    removeGoal,
    updateGoal,
    findGoal,
    calculateProgress,
    progressMap,
  };
};
