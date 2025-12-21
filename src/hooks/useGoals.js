import { useMemo, useEffect, useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { parseDate } from "../utils/dateUtils";
import { generateId } from "../utils/generatedId";

export const useGoals = () => {
  const [goals, setGoals] = useLocalStorage("goals", []);

  const createGoal = (goal) => ({
    id: goal.id || generateId(),
    text: goal.text || "",
    dueDate: goal.dueDate || null,
    completed: goal.completed || false,
    steps: Array.isArray(goal.steps) ? goal.steps : [],
    tags: Array.isArray(goal.tags) ? goal.tags : [],
    createdAt: goal.createdAt || Date.now(),
  });

  const addGoal = (goal) => {
    setGoals((prev) => [...prev, createGoal(goal)]);
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
    .map((g) => parseDate(g.dueDate));

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

  useEffect(() => {
    let fixed = false;
    const sanitized = goals.map((g) => {
      const correct = createGoal(g);
      if (JSON.stringify(g) !== JSON.stringify(correct)) fixed = true;
      return correct;
    });

    if (fixed) setGoals(sanitized);
  }, [goals, setGoals]);

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
