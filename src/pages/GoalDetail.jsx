import { useState } from "react";
import StepForm from "../components/Step/StepForm";
import StepList from "../components/Step/StepList";
import TagManagerModal from "../components/Tag/TagManagerModal";
import { getContrastTextColor } from "../components/ui/ColorPalette";
import { useParams, useNavigate } from "react-router-dom";

export default function GoalDetail({
  goals,
  availableTags,
  updateGoal,
  removeGoal,
  addTag,
  removeTag,
  updateTag,
  toggleGoalAndSteps,
  addStep,
  toggleStep,
  removeStep,
  statusColor,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const goal = goals.find((g) => g.id === id);

  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isEditingDue, setIsEditingDue] = useState(false);

  const handleRemoveGoal = () => {
    if (window.confirm("Delete this goal completely?")) {
      removeGoal(goal.id);
      navigate("/goals");
    }
  };

  if (!goal)
    return (
      <div className="min-h-screen bg-gray-800 flex justify-center items-center">
        <p className="text-gray-500">Goal not found</p>
      </div>
    );

  return (
    <div className="min-h-screen flex justify-center items-start py-10">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 w-full max-w-md space-y-5">
        <div className="flex justify-between items-start">
          <h2 className="text-2xl font-semibold text-gray-100 break-words">
            {goal.text}
          </h2>

          {isEditingDue ? (
            <input
              type="date"
              className="input input-bordered input-xs"
              value={goal.dueDate || ""}
              onChange={(e) =>
                updateGoal({ ...goal, dueDate: e.target.value || null })
              }
              onBlur={() => setIsEditingDue(false)}
              autoFocus
            />
          ) : (
            <span
              className={`text-sm cursor-pointer ${statusColor(goal.dueDate)}`}
              onClick={() => setIsEditingDue(true)}
            >
              {goal.dueDate ? goal.dueDate : "No Due Date"}
            </span>
          )}
          <button
            className="btn btn-outline btn-error btn-xs"
            onClick={handleRemoveGoal}
          >
            Delete
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {goal.tags?.length > 0 ? (
              goal.tags.map((tagId) => {
                const tag = availableTags.find((t) => t.id === tagId);
                if (!tag) return null;
                return (
                  <span
                    key={tag.id}
                    className="px-2 py-1 badge "
                    style={{
                      backgroundColor: tag.color,
                      color: getContrastTextColor(tag.color),
                    }}
                  >
                    {tag.name}
                  </span>
                );
              })
            ) : (
              <span className="text-gray-400 italic text-sm">No tags</span>
            )}
            <button
              className="btn btn-sm btn-outline text-white rounded-xl px-2 py-1"
              onClick={() => setIsTagModalOpen(true)}
            >
              Edit Tags
            </button>
          </div>
        </div>

        {isTagModalOpen && (
          <TagManagerModal
            isOpen={isTagModalOpen}
            onClose={() => setIsTagModalOpen(false)}
            availableTags={availableTags}
            updateTag={updateTag}
            removeTag={removeTag}
            addTag={addTag}
            selectedTags={goal.tags}
            setSelectedTags={(newTags) =>
              updateGoal({ ...goal, tags: newTags })
            }
            selectMode={true}
          />
        )}

        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-100 font-semibold">
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
            className="btn btn-sm bg-violet-600 hover:bg-violet-700 text-white rounded-xl"
            onClick={() => toggleGoalAndSteps(goal.id)}
          >
            {goal.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
        </div>

        <div className="divider text-gray-100 font-semibold my-3">Steps</div>

        <StepForm onAddStep={(text) => addStep(goal.id, text)} />
        <StepList
          goal={goal}
          onToggleStep={(stepId) => toggleStep(goal.id, stepId)}
          onRemoveStep={(stepId) => removeStep(goal.id, stepId)}
        />

        <div className="pt-4">
          <button
            className="btn bg-violet-600 hover:bg-violet-700 text-white rounded-xl w-full"
            onClick={() => navigate("/goals")}
          >
            ← Back to Goals
          </button>
        </div>
      </div>
    </div>
  );
}
