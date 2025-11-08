import { useParams, useNavigate } from "react-router-dom";
import StepForm from "../components/Step/StepForm";
import StepList from "../components/Step/StepList";

export default function GoalDetail({
  goalList,
  updateGoalList,
  handleToggleGoal,
  handleRemoveGoal,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const goal = goalList.find((g) => g.id === id);
  if (!goal)
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <p className="text-gray-500">Goal not found</p>
      </div>
    );

  const handleToggle = () => handleToggleGoal(goal.id);

  const handleAddStep = (text) => {
    if (!text.trim()) return;
    updateGoalList((prev) =>
      prev.map((g) =>
        g.id === goal.id
          ? {
              ...g,
              steps: [
                ...g.steps,
                { id: crypto.randomUUID(), text, completed: false },
              ],
            }
          : g
      )
    );
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start py-10">
      <div className="bg-base-100 shadow-lg rounded-xl p-6 w-full max-w-md space-y-5">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold break-words">{goal.text}</h2>
          <button
            className="btn btn-outline btn-error btn-xs"
            onClick={() => {
              handleRemoveGoal(goal.id);
              navigate("/");
            }}
          >
            Delete
          </button>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-medium">
            Status:{" "}
            <span
              className={`${
                goal.completed ? "text-success" : "text-warning"
              } font-semibold`}
            >
              {goal.completed ? "Completed" : "In Progress"}
            </span>
          </p>
          <button
            className="btn btn-sm btn-neutral"
            onClick={handleToggle}
          >
            {goal.completed ? "Not Finished" : "All Done"}
          </button>
        </div>

        <div className="divider my-3">Steps</div>

        <StepForm onAddStep={handleAddStep} />
        <StepList
          goal={goal}
          updateGoalList={updateGoalList}
        />

        <div className="pt-4">
          <button
            className="btn btn-neutral w-full"
            onClick={() => navigate("/")}
          >
            ← Back to Goals
          </button>
        </div>
      </div>
    </div>
  );
}
