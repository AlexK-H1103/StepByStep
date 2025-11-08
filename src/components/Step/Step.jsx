export default function Step({ step, goal, updateGoalList }) {
  const handleToggleStep = () => {
    updateGoalList((prevGoals) =>
      prevGoals.map((g) => {
        if (g.id !== goal.id) return g;

        const updatedSteps = g.steps.map((s) =>
          s.id === step.id ? { ...s, completed: !s.completed } : s
        );
        const allCompleted = updatedSteps.every((s) => s.completed);

        return {
          ...g,
          steps: updatedSteps,
          completed: allCompleted,
        };
      })
    );
  };

  const handleRemoveStep = () => {
    updateGoalList((prevGoals) =>
      prevGoals.map((g) => {
        if (g.id !== goal.id) return g;

        const updatedSteps = g.steps.filter((s) => s.id !== step.id);
        const allCompleted =
          updatedSteps.length > 0
            ? updatedSteps.every((s) => s.completed)
            : false;

        return {
          ...g,
          steps: updatedSteps,
          completed: allCompleted,
        };
      })
    );
  };

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-base-300 p-2">
      <label className="flex items-center gap-2 flex-grow">
        <input
          type="checkbox"
          className="checkbox checkbox-neutral"
          checked={step.completed}
          onChange={handleToggleStep}
        />
        <span className={`truncate ${step.completed ? " text-gray-500" : ""}`}>
          {step.text}
        </span>
      </label>
      <button
        onClick={handleRemoveStep}
        className="btn btn-xs btn-outline btn-error"
        title="Remove step"
      >
        ✕
      </button>
    </div>
  );
}
