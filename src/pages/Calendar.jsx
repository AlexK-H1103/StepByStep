export default function Calendar({
  dueDates,
  selectedDate,
  setSelectedDate,
  daily,
  todos,
  addTodo,
  removeTodo,
  toggleTodo,
  log,
  setLog,
  streak,
}) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
      <div className="flex border-b border-gray-700 mb-4">Calendar</div>
      <div>Todo</div>
      <div>{log}</div>
    </div>
  );
}
