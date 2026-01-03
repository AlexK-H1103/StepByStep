import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CalendarBase from "../components/Calendar/CalendarBase";
import TodoForm from "../components/DailyInput/TodoForm";
import TodoList from "../components/DailyInput/TodoList";
import { getLocalDateKey, dateKeyToDate } from "../utils/dateUtils";

export default function Calendar({
  dueDates,
  daily,
  history,
  addTodo,
  removeTodo,
  toggleTodo,
  loggedDates,
}) {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const dateKeyFromUrl = params.get("date");

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (!dateKeyFromUrl) {
      setSelectedDate(null);
      return;
    }
    const d = dateKeyToDate(dateKeyFromUrl);
    if (d) setSelectedDate(d);
  }, [dateKeyFromUrl]);

  if (!daily) return null;

  const selectedDateKey = selectedDate
    ? getLocalDateKey(selectedDate)
    : daily.date;

  const displayedEntry = useMemo(() => {
    if (selectedDateKey === daily.date) return daily;

    return (
      history?.[selectedDateKey] ?? {
        date: selectedDateKey,
        todos: [],
        log: "",
        isDone: false,
      }
    );
  }, [selectedDateKey, daily, history]);

  const displayDate = dateKeyToDate(displayedEntry.date);

  const handleAddTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addTodo(trimmed, selectedDateKey);
  };

  const handleSelectDate = (date) => {
    if (!date) return;
    const key = getLocalDateKey(date);
    setSelectedDate(date);
    navigate(`/calendar?date=${key}`, { replace: true });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
        <div className="bg-violet-100 border border-violet-100 p-4 rounded-lg shadow-md w-full">
          <div className="flex justify-center">
            <CalendarBase
              selected={selectedDate}
              onSelect={handleSelectDate}
              loggedDates={loggedDates}
              dueDates={dueDates}
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
        <div className="px-4 font-semibold border-b-2 border-violet-500 text-violet-300">
          {displayDate?.toLocaleDateString()}
        </div>
        <div className="text-sm font-semibold text-gray-300 my-1">Todos</div>
        <div className="space-y-3">
          <TodoForm onAddTodo={handleAddTodo} />
          <TodoList
            todos={displayedEntry.todos}
            onToggleTodo={(id) => toggleTodo(id, selectedDateKey)}
            onRemoveTodo={(id) => removeTodo(id, selectedDateKey)}
          />
        </div>
        <div className="text-sm font-semibold text-gray-300 mt-3">
          Daily Input
        </div>
        <div className="text-gray-300 mt-2">
          {displayedEntry.log || "Nothing logged..."}
        </div>
      </div>
    </div>
  );
}
