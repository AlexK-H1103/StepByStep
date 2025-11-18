import { useState } from "react";
import StepForm from "../components/Step/StepForm";
import StepList from "../components/Step/StepList";
import TagModal from "../components/TagModal";
import { useParams, useNavigate } from "react-router-dom";

export default function GoalDetail({
  goals,
  updateGoal,
  removeGoal,
  availableTags,
  addTag,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const goal = goals.find((g) => g.id === id);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  if (!goal)
    return (
      <div className="min-h-screen bg-base-200 flex justify-center items-center">
        <p className="text-gray-500">Goal not found</p>
      </div>
    );

  const handleToggleGoalAndSteps = () => {
    const newStatus = !goal.completed;
    const updated = {
      ...goal,
      completed: newStatus,
      steps: goal.steps.map((s) => ({ ...s, completed: newStatus })),
    };
    updateGoal(updated);
  };

  const handleAddStep = (text) => {
    if (!text.trim()) return;
    const newSteps = [
      ...(goal.steps || []),
      { id: crypto.randomUUID(), text: text.trim(), completed: false },
    ];
    updateGoal({ ...goal, steps: newSteps, completed: false });
  };

  const handleRemoveGoal = () => {
    removeGoal(goal.id);
    navigate("/");
  };

  const handleToggleStep = (stepId) => {
    const updatedSteps = goal.steps.map((s) =>
      s.id === stepId ? { ...s, completed: !s.completed } : s
    );
    const allCompleted =
      updatedSteps.length > 0 ? updatedSteps.every((s) => s.completed) : false;
    updateGoal({ ...goal, steps: updatedSteps, completed: allCompleted });
  };

  const handleRemoveStep = (stepId) => {
    const updatedSteps = goal.steps.filter((s) => s.id !== stepId);
    const allCompleted =
      updatedSteps.length > 0 ? updatedSteps.every((s) => s.completed) : false;
    updateGoal({ ...goal, steps: updatedSteps, completed: allCompleted });
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start py-10">
      <div className="bg-base-100 shadow-lg rounded-xl p-6 w-full max-w-md space-y-5">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-bold break-words">{goal.text}</h2>
          <button
            className="btn btn-outline btn-error btn-xs"
            onClick={handleRemoveGoal}
          >
            Delete
          </button>
        </div>

        <div className="space-y-2">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setIsTagModalOpen(true)}
          >
            Edit Tags
          </button>
          <div className="flex flex-wrap gap-2">
            {goal.tags?.length > 0 ? (
              goal.tags.map((tagId) => {
                const tag = availableTags.find((t) => t.id === tagId);
                if (!tag) return null;
                return (
                  <span
                    key={tag.id}
                    className="px-2 py-1 badge text-white"
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.name}
                  </span>
                );
              })
            ) : (
              <span className="text-gray-400 italic text-sm">No tags</span>
            )}
          </div>
        </div>

        {isTagModalOpen && (
          <TagModal
            isOpen={isTagModalOpen}
            onClose={() => setIsTagModalOpen(false)}
            availableTags={availableTags}
            selectedTags={goal.tags}
            setSelectedTags={(newTags) =>
              updateGoal({ ...goal, tags: newTags })
            }
            addTag={addTag}
          />
        )}

        <div className="flex items-center justify-between">
          <p className="font-medium">
            Status:{" "}
            <span
              className={`${
                goal.completed ? "text-success" : "text-warning"
              } font-semibold`}
            >
              {goal.completed ? "Complete" : "Incomplete"}
            </span>
          </p>
          <button
            className="btn btn-sm btn-neutral"
            onClick={handleToggleGoalAndSteps}
          >
            {goal.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
        </div>

        <div className="divider my-3">Steps</div>

        <StepForm onAddStep={handleAddStep} />
        <StepList
          goal={goal}
          onToggleStep={handleToggleStep}
          onRemoveStep={handleRemoveStep}
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
