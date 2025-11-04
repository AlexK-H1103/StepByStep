import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GoalForm({ handleAddGoal }) {
  const [goalText, setGoalText] = useState("");
  const [steps, setSteps] = useState([{ id: crypto.randomUUID(), text: "" }]);
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
    };

    handleAddGoal(newGoal);
    setGoalText("");
    setSteps([{ id: crypto.randomUUID(), text: "" }]);
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
              name="goal"
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
              {steps.map((step, index) => (
                <input
                  key={step.id}
                  type="text"
                  value={step.text}
                  onChange={(e) => handleStepChange(step.id, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  className="input input-bordered w-full"
                />
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
