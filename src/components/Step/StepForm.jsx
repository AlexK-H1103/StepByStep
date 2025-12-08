import { useState } from "react";

export default function StepForm({ onAddStep }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddStep(trimmed);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 mt-2"
      aria-label="Add new step"
    >
      <input
        type="text"
        name="step"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new step..."
        className="input input-bordered text-gray-500 bg-violet-100 input-sm flex-grow"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="btn btn-sm bg-violet-600 hover:bg-violet-700 text-white rounded-xl disabled:bg-gray-400"
      >
        Add
      </button>
    </form>
  );
}
