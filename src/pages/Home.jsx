import TodoList from "../components/DailyInput/TodoList";
import TodoForm from "../components/DailyInput/TodoForm";
import LogInput from "../components/DailyInput/LogInput";
import MiniCalendar from "../components/Calendar/MiniCalendar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({
  goals,
  availableTags,
  progressMap,
  statusColor,
  selectedDate,
  setSelectedDate,
  todos,
  addTodo,
  removeTodo,
  toggleTodo,
  log,
  setLog,
}) {
  const navigate = useNavigate();

  const handleAddTodo = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addTodo(trimmed);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 space-y-6">
      <div className="bg-gray-800/95 border border-gray-700 rounded-2xl p-6 shadow-lg">
        <div className="flex border-b border-gray-700 mb-4">
          <div className="px-4 py-2 font-semibold transition-all border-b-2 border-violet-500 text-violet-300">
            3 Day Streek!
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        <div className="space-y-6">
          <div className="bg-gray-800/95 border border-gray-700 rounded-2xl p-6 shadow-lg">
            <div className="flex border-b border-gray-700 mb-4">
              <div className="px-4 py-2 font-semibold border-b-2 border-violet-500 text-violet-300">
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
              <div className="divider my-3">Daily Input</div>
              <LogInput
                value={log}
                onChange={setLog}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="bg-gray-800/95 border border-gray-700 rounded-2xl p-4 shadow-lg">
            <div className="flex justify-center">
              <MiniCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
