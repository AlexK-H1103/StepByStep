import TodoList from "../components/DailyInput/TodoList";
import TodoForm from "../components/DailyInput/TodoForm";
import LogInput from "../components/DailyInput/LogInput";
import MiniCalendar from "../components/Calendar/MiniCalendar";

export default function Home({
  dueDates,
  todos,
  addTodo,
  removeTodo,
  toggleTodo,
  log,
  setLog,
  loggedDates,
  streak,
}) {
  const handleAddTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addTodo(trimmed);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 space-y-6">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
        <div className="flex border-b border-gray-700 mb-4">
          <div className="px-4 py-2 font-semibold transition-all border-b-2 border-violet-500 text-violet-300">
            {streak ? (
              <span>{streak} Day Streek!</span>
            ) : (
              <span className="text-gray-400 italic text-sm">
                Rest is part of the process - just like training your body
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
            <div className="flex border-b border-gray-700 mb-4">
              <div className="px-4 font-semibold border-b-2 border-violet-500 text-violet-300">
                Today's Plan
              </div>
            </div>
            <div className="space-y-3">
              <TodoForm onAddTodo={handleAddTodo} />
              <TodoList
                todos={todos}
                onToggleTodo={toggleTodo}
                onRemoveTodo={removeTodo}
              />
              <div className="text-violet-300 my-3">Daily Input</div>
              <LogInput
                value={log}
                onChange={setLog}
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-4 shadow-lg">
          <div className="flex justify-center">
            <MiniCalendar
              loggedDates={loggedDates}
              dueDates={dueDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
