export function useSteps(goals, updateGoal) {
  const findGoal = (goalId) => goals.find((g) => g.id === goalId);

  const toggleGoalAndSteps = (goalId) => {
    const goal = findGoal(goalId);
    if (!goal) return;

    const newStatus = !goal.completed;

    updateGoal({
      ...goal,
      completed: newStatus,
      steps: goal.steps.map((s) => ({
        ...s,
        completed: newStatus,
      })),
    });
  };

  const addStep = (goalId, text) => {
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
  };

  const toggleStep = (goalId, stepId) => {
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
  };

  const removeStep = (goalId, stepId) => {
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
  };

  return {
    toggleGoalAndSteps,
    addStep,
    toggleStep,
    removeStep,
  };
}
