import Home from "./pages/Home";
import Goals from "./pages/Goals";
import GoalDetail from "./pages/GoalDetail";
import GoalForm from "./pages/GoalForm";
import Calendar from "./pages/Calendar";
import Layout from "./components/Layout/Layout";
import TagManagerModal from "./components/Tag/TagManagerModal";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useGoals } from "./hooks/useGoals";
import { useSteps } from "./hooks/useSteps";
import { useTags } from "./hooks/useTags";
import { useDailyStorage } from "./hooks/useDailyStorage";

export default function App() {
  const {
    goals,
    addGoal,
    updateGoal,
    removeGoal,
    dueDates,
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
    daily,
    addTodo,
    toggleTodo,
    removeTodo,
    setLog,
    loggedDates,
    history,
    streak,
  } = useDailyStorage();
  const { todos, log } = daily;

  const [tagManagerOpen, setTagManagerOpen] = useState(false);

  return (
    <Layout onOpenTagManager={() => setTagManagerOpen(true)}>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              dueDates={dueDates}
              todos={todos}
              addTodo={addTodo}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
              log={log}
              setLog={setLog}
              loggedDates={loggedDates}
              streak={streak}
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
        <Route
          path="/calendar"
          element={
            <Calendar
              dueDates={dueDates}
              daily={daily}
              history={history}
              addTodo={addTodo}
              removeTodo={removeTodo}
              toggleTodo={toggleTodo}
              setLog={setLog}
              loggedDates={loggedDates}
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
