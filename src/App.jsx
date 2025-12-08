import Home from "./pages/Home";
import Goals from "./pages/Goals";
import GoalDetail from "./pages/GoalDetail";
import GoalForm from "./pages/GoalForm";
import Layout from "./components/Layout/Layout";
import TagManagerModal from "./components/Tag/TagManagerModal";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useGoals } from "./hooks/useGoals";
import { useSteps } from "./hooks/useSteps";
import { useTags } from "./hooks/useTags";
import { useDate } from "./hooks/useDate";
import { useDailyStorage } from "./hooks/useDailyStorage";

export default function App() {
  const {
    goals,
    addGoal,
    updateGoal,
    removeGoal,
    progressMap,
    removeTagFromGoals,
  } = useGoals();

  const { toggleGoalAndSteps, addStep, toggleStep, removeStep } = useSteps(
    goals,
    updateGoal
  );

  const { availableTags, addTag, updateTag, removeTag } =
    useTags(removeTagFromGoals);

  const {
    formatDate,
    parseDate,
    getToday,
    getTodayKey,
    getDaysLeft,
    getDeadlineColor,
  } = useDate();

  const { daily, todos, log, addTodo, toggleTodo, removeTodo, setLog } =
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
              availableTags={availableTags}
              updateGoal={updateGoal}
              removeGoal={removeGoal}
              addTag={addTag}
              updateTag={updateTag}
              toggleGoalAndSteps={toggleGoalAndSteps}
              addStep={addStep}
              toggleStep={toggleStep}
              removeStep={removeStep}
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
