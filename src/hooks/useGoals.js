import { useMemo, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { dateKeyToDate } from "../utils/dateUtils";
import { sanitizeGoals } from "../utils/sanitizeData";

export const useGoals = () => {
  const [goals, setGoals] = useLocalStorage("goals", [], sanitizeGoals);

  const addGoal = (goal = {}) => {
    setGoals((prev) => [
      ...prev,
      { ...goal, id: crypto.randomUUID(), createdAt: Date.now() },
    ]);
  };

  const removeGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const updateGoal = (updated) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === updated.id ? { ...g, ...updated } : g))
    );
  };

  const dueDates = goals
    .filter((g) => g.dueDate)
    .map((g) => dateKeyToDate(g.dueDate));

  const calculateProgress = useCallback((goal) => {
    if (!goal?.steps?.length) {
      return goal?.completed ? 100 : 0;
    }
    const completed = goal.steps.filter((s) => s.completed).length;
    return Math.round((completed / goal.steps.length) * 100);
  }, []);

  const progressMap = useMemo(() => {
    const map = {};
    goals.forEach((g) => {
      map[g.id] = calculateProgress(g);
    });
    return map;
  }, [goals, calculateProgress]);

  const removeTagFromGoals = (tagId) => {
    setGoals((prev) =>
      prev.map((g) => ({
        ...g,
        tags: g.tags?.filter((id) => id !== tagId),
      }))
    );
  };

  return {
    goals,
    setGoals,
    addGoal,
    removeGoal,
    updateGoal,
    dueDates,
    calculateProgress,
    progressMap,
    removeTagFromGoals,
  };
};
