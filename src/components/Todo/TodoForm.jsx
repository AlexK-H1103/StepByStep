import { useState } from "react";

export default function TodoForm({ onAddTodo }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddTodo(trimmed);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 mt-2"
      aria-label="Add new Todo"
    >
      <input
        type="text"
        name="Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new Todo..."
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
