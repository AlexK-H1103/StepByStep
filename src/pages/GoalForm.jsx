import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ColorPalette, {
  getContrastTextColor,
} from "../components/ui/ColorPalette";

export default function GoalForm({ addGoal, availableTags, addTag }) {
  const [goalText, setGoalText] = useState("");
  const [dueDate, setDueDate] = useState("");
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
      }
      if (prev.length >= 3) {
        return prev;
      }
      return [...prev, tagId];
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
        id: s.id,
        text: s.text.trim(),
        completed: false,
      }));

    const newGoal = {
      id: crypto.randomUUID(),
      text: trimmedGoal,
      completed: false,
      steps: validSteps,
      tags: selectedTags,
      dueDate: dueDate || null,
    };

    addGoal(newGoal);
    setGoalText("");
    setDueDate("");
    setSteps([{ id: crypto.randomUUID(), text: "" }]);
    setSelectedTags([]);
    navigate(`/goals/${newGoal.id}`);
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-10">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 w-full max-w-md space-y-5">
        <h2 className="text-xl text-gray-100 font-semibold text-center">
          Create New Goal
        </h2>

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
              className="input text-gray-500 input-bordered w-full"
              aria-label="New goal"
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="input text-gray-500 input-bordered w-full"
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
                  className="input text-gray-500 input-bordered w-full"
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
                className="input text-gray-500 input-bordered flex-1"
              />
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full border cursor-pointer"
                  style={{ backgroundColor: newTagColor }}
                  onClick={() => setShowPalette(!showPalette)}
                />
                {showPalette && (
                  <div className="absolute top-10 left-0 z-10 p-2 bg-gray-900 rounded shadow-md">
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
                disabled={!newTagName.trim()}
                className="btn btn-sm bg-violet-600 hover:bg-violet-700 text-white rounded-xl disabled:bg-gray-400"
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
              disabled={!goalText.trim()}
              className="btn bg-violet-600 hover:bg-violet-700 text-white rounded-xl disabled:bg-gray-400 w-full"
            >
              Add Goal
            </button>
            <button
              type="button"
              className="btn btn-outline text-white rounded-xl w-full"
              onClick={() => navigate("/goals")}
            >
              ← Back to Goals
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
