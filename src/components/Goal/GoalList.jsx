import Goal from "./Goal";

export default function GoalList({ goals, emptyMessage, availableTags }) {
  const calculateProgress = (goal) => {
    if (!goal.steps || goal.steps.length === 0) return goal.completed ? 100 : 0;
    const completedSteps = goal.steps.filter((s) => s.completed).length;
    return Math.round((completedSteps / goal.steps.length) * 100);
  };

  if (!goals || goals.length === 0)
    return (
      <p className="text-center text-gray-500 text-sm italic">{emptyMessage}</p>
    );

  return (
    <div className="space-y-4">
      {goals.map((g) => (
        <Goal
          key={g.id}
          progress={calculateProgress(g)}
          availableTags={availableTags}
          {...g}
        />
      ))}
    </div>
  );
}
