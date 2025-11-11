import Home from "./pages/Home";
import GoalDetail from "./pages/GoalDetail";
import GoalForm from "./pages/GoalForm";
import { Routes, Route } from "react-router-dom";
import { useGoals } from "./hooks/useGoals";
import { useTags } from "./hooks/useTags";

export default function App() {
  const { goals, addGoal, updateGoal, removeGoal } = useGoals();
  const { availableTags, addTag, removeTag } = useTags();

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              goals={goals}
              availableTags={availableTags}
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
    </div>
  );
}
