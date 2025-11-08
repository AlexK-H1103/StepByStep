import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GoalDetail from "./pages/GoalDetail";
import GoalForm from "./pages/GoalForm";

export default function App() {
  const [goals, setGoals] = useState(() => {
    const data = JSON.parse(localStorage.getItem("goals"));
    if (!data) return [];
    return data.map((g) => ({
      ...g,
      steps: g.steps || [],
      tags: g.tags || [],
    }));
  });

  const [availableTags, setAvailableTags] = useState(() => {
    const data = JSON.parse(localStorage.getItem("tags"));
    return data || [];
  });

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("tags", JSON.stringify(availableTags));
  }, [availableTags]);

  const handleAddGoal = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
  };

  const handleRemoveGoal = (id) =>
    setGoals((prev) => prev.filter((g) => g.id !== id));

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
              goalList={goals}
              updateGoalList={setGoals}
              handleRemoveGoal={handleRemoveGoal}
              availableTags={availableTags}
            />
          }
        />
        <Route
          path="/addGoal"
          element={
            <GoalForm
              handleAddGoal={handleAddGoal}
              availableTags={availableTags}
              setAvailableTags={setAvailableTags}
            />
          }
        />
      </Routes>
    </div>
  );
}
