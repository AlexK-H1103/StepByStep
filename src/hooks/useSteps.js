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
      const updated = {
        ...goal,
        completed: newStatus,
        steps: goal.steps.map((s) => ({ ...s, completed: newStatus })),
      };

      updateGoal(updated);
    },
    [findGoal, updateGoal]
  );

  const addStep = useCallback(
    (goalId, text) => {
      if (!text.trim()) return;

      const goal = findGoal(goalId);
      if (!goal) return;

      const newSteps = [
        ...(goal.steps || []),
        {
          id: crypto.randomUUID(),
          text: text.trim(),
          completed: false,
        },
      ];

      updateGoal({
        ...goal,
        steps: newSteps,
        completed: false,
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

      const allCompleted =
        updatedSteps.length > 0 && updatedSteps.every((s) => s.completed);

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

      const allCompleted =
        updatedSteps.length > 0 && updatedSteps.every((s) => s.completed);

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
