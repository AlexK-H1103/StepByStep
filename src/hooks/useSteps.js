import { useCallback } from "react";

export function useSteps(goals, updateGoal) {
  const findGoal = useCallback(
    (goalId) => goals.find((g) => g.id === goalId),
    [goals]
  );

  const toggleGoalAndSteps = useCallback(
    (goalId) => {
      const goal = findGoal(goalId);
      if (!goal) return;

      const newStatus = !goal.completed;

      const updatedSteps = goal.steps.map((s) =>
        typeof s.id === "string" ? { ...s, completed: newStatus } : s
      );

      updateGoal({
        ...goal,
        completed: newStatus,
        steps: updatedSteps,
      });
    },
    [findGoal, updateGoal]
  );

  const addStep = useCallback(
    (goalId, text) => {
      if (!text.trim()) return;

      const goal = findGoal(goalId);
      if (!goal) return;

      updateGoal({
        ...goal,
        completed: false,
        steps: [
          ...goal.steps,
          {
            id: crypto.randomUUID(),
            text: text.trim(),
            completed: false,
          },
        ],
      });
    },
    [findGoal, updateGoal]
  );

  const toggleStep = useCallback(
    (goalId, stepId) => {
      const goal = findGoal(goalId);
      if (!goal) return;

      const updatedSteps = goal.steps.map((s) =>
        s.id === stepId ? { ...s, completed: !s.completed } : s
      );

      const validSteps = updatedSteps.filter((s) => typeof s.id === "string");

      const allCompleted =
        validSteps.length > 0 && validSteps.every((s) => s.completed);

      updateGoal({
        ...goal,
        steps: updatedSteps,
        completed: allCompleted,
      });
    },
    [findGoal, updateGoal]
  );

  const removeStep = useCallback(
    (goalId, stepId) => {
      const goal = findGoal(goalId);
      if (!goal) return;

      const updatedSteps = goal.steps.filter((s) => s.id !== stepId);

      const validSteps = updatedSteps.filter((s) => typeof s.id === "string");

      const allCompleted =
        validSteps.length > 0 && validSteps.every((s) => s.completed);

      updateGoal({
        ...goal,
        steps: updatedSteps,
        completed: allCompleted,
      });
    },
    [findGoal, updateGoal]
  );

  return {
    toggleGoalAndSteps,
    addStep,
    toggleStep,
    removeStep,
  };
}
