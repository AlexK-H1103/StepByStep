import Home from "./pages/Home";
import Goals from "./pages/Goals";
import GoalDetail from "./pages/GoalDetail";
import GoalForm from "./pages/GoalForm";
import Layout from "./components/Layout/Layout";
import TagManagerModal from "./components/Tag/TagManagerModal";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useGoals } from "./hooks/useGoals";
import { useTags } from "./hooks/useTags";
import { useDate } from "./hooks/useDate";
import { useDailyStorage } from "./hooks/useDailyStorage";

export default function App() {
  const { goals, addGoal, updateGoal, removeGoal, progressMap } = useGoals();
  const { availableTags, addTag, updateTag, removeTag } = useTags({
    goals,
    updateGoal,
  });
  const {
    selectedDate,
    setSelectedDate,
    formatDate,
    parseDate,
    today,
    resetToToday,
    getDeadlineColor,
  } = useDate();
  const { todos, log, addTodo, toggleTodo, removeTodo, setLog } =
    useDailyStorage();

  const [tagManagerOpen, setTagManagerOpen] = useState(false);

  return (
    <Layout onOpenTagManager={() => setTagManagerOpen(true)}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              goals={goals}
              availableTags={availableTags}
              progressMap={progressMap}
              statusColor={getDeadlineColor}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              todos={todos}
              addTodo={addTodo}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
              log={log}
              setLog={setLog}
            />
          }
        />
        <Route
          path="/goals"
          element={
            <Goals
              goals={goals}
              availableTags={availableTags}
              progressMap={progressMap}
              statusColor={getDeadlineColor}
            />
          }
        />
        <Route
          path="/goals/:id"
          element={
            <GoalDetail
              goals={goals}
              updateGoal={updateGoal}
              removeGoal={removeGoal}
              availableTags={availableTags}
              addTag={addTag}
              statusColor={getDeadlineColor}
            />
          }
        />
        <Route
          path="/addGoal"
          element={
            <GoalForm
              addGoal={addGoal}
              availableTags={availableTags}
              addTag={addTag}
            />
          }
        />
      </Routes>

      <TagManagerModal
        isOpen={tagManagerOpen}
        onClose={() => setTagManagerOpen(false)}
        availableTags={availableTags}
        updateTag={updateTag}
        removeTag={removeTag}
        addTag={addTag}
      />
    </Layout>
  );
}
