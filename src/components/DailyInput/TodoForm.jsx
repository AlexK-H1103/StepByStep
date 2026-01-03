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
      aria-label="TodoForm"
    >
      <input
        type="text"
        name="Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo"
        className="input input-bordered text-gray-500 bg-violet-100 input-sm flex-grow"
      />
      <button
        type="submit"
        className="btn btn-sm bg-violet-600 hover:bg-violet-700 text-white rounded-xl"
      >
        Add
      </button>
    </form>
  );
}
