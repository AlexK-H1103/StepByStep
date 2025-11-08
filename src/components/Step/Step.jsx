export default function Step({ step, goal, updateGoalList }) {
  const handleToggleStep = () => {
    updateGoalList((prevGoals) =>
      prevGoals.map((g) =>
        g.id === goal.id
          ? {
              ...g,
              steps: g.steps.map((s) =>
                s.id === step.id ? { ...s, completed: !s.completed } : s
              ),
            }
          : g
      )
    );
  };

  const handleRemoveStep = () => {
    updateGoalList((prevGoals) =>
      prevGoals.map((g) =>
        g.id === goal.id
          ? { ...g, steps: g.steps.filter((s) => s.id !== step.id) }
          : g
      )
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
