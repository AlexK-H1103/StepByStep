import Home from "./pages/Home";
import GoalDetail from "./pages/GoalDetail";
import GoalForm from "./pages/GoalForm";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { useGoals } from "./hooks/useGoals";
import { useTags } from "./hooks/useTags";

export default function App() {
  const { goals, addGoal, updateGoal, removeGoal, progressMap } = useGoals();

  const { availableTags, addTag, updateTag, removeTagCompletely } = useTags({
    goals,
    updateGoal,
  });

  return (
    <div className="min-h-screen bg-base-200">
      <Header />
      <main className="pt-6 px-4">
        <Routes>
          <Route
            path="/"
            element={
              <Home
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
                updateGoal={updateGoal}
                removeGoal={removeGoal}
                availableTags={availableTags}
                addTag={addTag}
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
      </main>
    </div>
  );
}
