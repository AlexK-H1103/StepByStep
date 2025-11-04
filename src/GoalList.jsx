import Goal from "./Goal";

export default function GoalList({ goals }) {
  const incomplete = goals.filter((g) => !g.completed);
  const complete = goals.filter((g) => g.completed);

  const calculateProgress = (goal) => {
    if (!goal.steps || goal.steps.length === 0) return goal.completed ? 100 : 0;
    const completedSteps = goal.steps.filter((s) => s.completed).length;
    return Math.round((completedSteps / goal.steps.length) * 100);
  };

  if (goals.length === 0)
    return <p className="text-center text-gray-500">No Goals</p>;

  return (
    <div className="space-y-6">
      <section>
        {incomplete.length ? (
          incomplete.map((g) => (
            <Goal
              key={g.id}
              progress={calculateProgress(g)}
              {...g}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center italic">All Done!</p>
        )}
      </section>

      <section>
        {complete.length ? (
          complete.map((g) => (
            <Goal
              key={g.id}
              progress={calculateProgress(g)}
              {...g}
            />
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center italic">
            No Completed Goals
          </p>
        )}
      </section>
    </div>
  );
}
