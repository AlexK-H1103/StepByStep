import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import GoalDetail from "./GoalDetail";
import GoalForm from "./GoalForm";

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

  // CHANGE BETWEEN COMPLETE INCOMPLETE
  const handleToggleGoal = (id) =>
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );

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
              handleToggleGoal={handleToggleGoal}
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
