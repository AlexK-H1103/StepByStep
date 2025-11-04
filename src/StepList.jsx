import Step from "./Step";

export default function StepList({ goal, updateGoalList }) {
  const steps = goal.steps || [];
  const incomplete = steps.filter((s) => !s.completed);
  const complete = steps.filter((s) => s.completed);

  if (steps.length === 0)
    return <p className="text-gray-500 text-sm">No steps</p>;

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          In Progress
        </h3>
        {incomplete.length ? (
          <div className="space-y-2">
            {incomplete.map((s) => (
              <Step
                key={s.id}
                step={s}
                goal={goal}
                updateGoalList={updateGoalList}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">All steps completed!</p>
        )}
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Completed</h3>
        {complete.length ? (
          <div className="space-y-2">
            {complete.map((s) => (
              <Step
                key={s.id}
                step={s}
                goal={goal}
                updateGoalList={updateGoalList}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm italic">No completed steps</p>
        )}
      </section>
    </div>
  );
}
