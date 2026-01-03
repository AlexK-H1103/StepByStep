import Todo from "./Todo";

export default function TodoList({ todos, onToggleTodo, onRemoveTodo }) {
  const incomplete = todos.filter((t) => !t.completed);
  const complete = todos.filter((t) => t.completed);

  if (todos.length === 0)
    return <p className="text-gray-500 text-sm italic">Nothing todo?</p>;

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Incomplete</h3>
        {incomplete.length ? (
          <div className="space-y-2">
            {incomplete.map((t) => (
              <Todo
                key={t.id}
                todo={t}
                onToggleTodo={onToggleTodo}
                onRemoveTodo={onRemoveTodo}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic">All done for today!</p>
        )}
      </section>

      <section>
        <h3 className="text-sm font-semibold text-gray-300 mb-2">Complete</h3>
        {complete.length ? (
          <div className="space-y-2">
            {complete.map((t) => (
              <Todo
                key={t.id}
                todo={t}
                onToggleTodo={onToggleTodo}
                onRemoveTodo={onRemoveTodo}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic">In progress...</p>
        )}
      </section>
    </div>
  );
}
