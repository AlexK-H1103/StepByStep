export default function Todo({ todo, onToggleTodo, onRemoveTodo }) {
  return (
    <div
      className={`flex items-center justify-between gap-2 text-gray-600 bg-violet-100 rounded-lg border border-base-300 p-2 ${
        todo.completed ? "opacity-70" : ""
      }`}
    >
      <label className="flex items-center gap-2 flex-grow cursor-pointer">
        <input
          type="checkbox"
          className="checkbox checkbox-neutral"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo.id)}
        />
        {todo.text}
      </label>

      <button
        onClick={() => onRemoveTodo(todo.id)}
        className="btn btn-xs btn-outline btn-error"
        title="Remove todo"
      >
        ✕
      </button>
    </div>
  );
}
