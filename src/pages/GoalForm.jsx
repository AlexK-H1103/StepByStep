import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColorPalette, {
  getContrastTextColor,
} from "../components/UI/ColorPalette";

export default function GoalForm({ addGoal, availableTags, addTag }) {
  const [goalText, setGoalText] = useState("");
  const [steps, setSteps] = useState([{ id: crypto.randomUUID(), text: "" }]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#EF4444");
  const [showPalette, setShowPalette] = useState(false);

  const navigate = useNavigate();

  const handleStepChange = (id, value) => {
    setSteps((prev) => {
      const updated = prev.map((s) =>
        s.id === id ? { ...s, text: value } : s
      );
      if (updated[updated.length - 1].text.trim() !== "") {
        updated.push({ id: crypto.randomUUID(), text: "" });
      }
      return updated;
    });
  };

  const toggleTag = (tagId) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else if (prev.length < 3) {
        return [...prev, tagId];
      }
      return prev;
    });
  };

  const handleAddNewTag = () => {
    const trimmedName = newTagName.trim();
    if (!trimmedName) return;
    const newTag = {
      id: crypto.randomUUID(),
      name: trimmedName,
      color: newTagColor,
    };

    addTag(newTag);
    setSelectedTags((prev) => [...prev, newTag.id].slice(0, 3));
    setNewTagName("");
    setNewTagColor("#EF4444");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedGoal = goalText.trim();
    if (!trimmedGoal) return;

    const validSteps = steps
      .filter((s) => s.text.trim() !== "")
      .map((s) => ({
        id: crypto.randomUUID(),
        text: s.text.trim(),
        completed: false,
      }));

    const newGoal = {
      id: crypto.randomUUID(),
      text: trimmedGoal,
      completed: false,
      steps: validSteps,
      tags: selectedTags,
    };

    addGoal(newGoal);
    navigate(`/goals/${newGoal.id}`);
  };

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start py-10">
      <div className="bg-base-100 shadow-lg rounded-xl p-6 w-full max-w-md space-y-6">
        <h2 className="text-xl font-semibold text-center">Create New Goal</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="font-medium">Goal</label>
            <input
              type="text"
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
              placeholder="Enter your goal..."
              className="input input-bordered w-full"
              aria-label="New goal"
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium">Steps</label>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <input
                  key={step.id}
                  type="text"
                  value={step.text}
                  onChange={(e) => handleStepChange(step.id, e.target.value)}
                  placeholder={`Step ${i + 1}`}
                  className="input input-bordered w-full"
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-medium">Tags (max 3)</label>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="New tag name"
                className="input input-bordered flex-1"
              />
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full border cursor-pointer"
                  style={{ backgroundColor: newTagColor }}
                  onClick={() => setShowPalette(!showPalette)}
                />
                {showPalette && (
                  <div className="absolute top-10 left-0 z-10 p-2 bg-base-100 rounded shadow-md">
                    <ColorPalette
                      value={newTagColor}
                      onChange={(color) => {
                        setNewTagColor(color);
                        setShowPalette(false);
                      }}
                      size="sm"
                      gridMode={true}
                    />
                  </div>
                )}
              </div>
              <button
                type="button"
                className="btn btn-sm btn-neutral"
                onClick={handleAddNewTag}
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  className={`px-2 py-1 badge  ${
                    selectedTags.includes(tag.id)
                      ? "ring-2 ring-black"
                      : "opacity-70"
                  }`}
                  style={{
                    backgroundColor: tag.color,
                    color: getContrastTextColor(tag.color),
                  }}
                  onClick={() => toggleTag(tag.id)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              type="submit"
              className="btn btn-neutral w-full"
            >
              Add Goal
            </button>
            <button
              type="button"
              className="btn btn-outline w-full"
              onClick={() => navigate("/")}
            >
              ← Back to Goals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
