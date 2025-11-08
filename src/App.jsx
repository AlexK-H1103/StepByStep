import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GoalDetail from "./pages/GoalDetail";
import GoalForm from "./pages/GoalForm";

export default function App() {
  const [goals, setGoals] = useState(() => {
    const data = JSON.parse(localStorage.getItem("goals"));
    if (!data) return [];
    return data.map((g) => ({ ...g, steps: g.steps || [] }));
  });

  // SAVE GOALS EVERYTIME CHANGES
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // ADD GOAL
  const handleAddGoal = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
  };

  // DELETE GOAL
  const handleRemoveGoal = (id) =>
    setGoals((prev) => prev.filter((g) => g.id !== id));

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home goals={goals} />}
        />
        <Route
          path="/goals/:id"
          element={
            <GoalDetail
              goalList={goals}
              updateGoalList={setGoals}
              handleRemoveGoal={handleRemoveGoal}
            />
          }
        />
        <Route
          path="/addGoal"
          element={<GoalForm handleAddGoal={handleAddGoal} />}
        />
      </Routes>
    </div>
  );
}
