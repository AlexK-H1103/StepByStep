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
      className="flex items-center gap-2 mt-3"
      aria-label="Add new step"
    >
      <input
        type="text"
        name="step"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new step..."
        className="input input-bordered input-sm flex-grow"
      />
      <button
        type="submit"
        className="btn btn-sm btn-neutral"
      >
        Add
      </button>
    </form>
  );
}
