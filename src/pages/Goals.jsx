import GoalList from "../components/Goal/GoalList";
import { getDeadlineColor } from "../utils/dateUtils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Goals({ goals, availableTags, progressMap }) {
  const navigate = useNavigate();

  const TABS = {
    INCOMPLETE: "incomplete",
    COMPLETE: "complete",
  };

  const [selectedTab, setSelectedTab] = useState(TABS.INCOMPLETE);

  const incompleteGoals = goals.filter((g) => !g.completed);
  const completeGoals = goals.filter((g) => g.completed);

  const displayedGoals =
    selectedTab === TABS.INCOMPLETE ? incompleteGoals : completeGoals;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg">
      <div className="flex border-b border-gray-700 mb-4">
        <button
          className={`px-4 py-2 font-semibold transition-all border-b-2
                      ${
                        selectedTab === TABS.INCOMPLETE
                          ? "border-violet-500 text-violet-300"
                          : "border-transparent text-gray-400 hover:text-gray-200"
                      }`}
          onClick={() => setSelectedTab(TABS.INCOMPLETE)}
        >
          Incomplete
        </button>
        <button
          className={`px-4 py-2 font-semibold transition-all border-b-2 
                      ${
                        selectedTab === TABS.COMPLETE
                          ? "border-violet-500 text-violet-300"
                          : "border-transparent text-gray-400 hover:text-gray-200"
                      }`}
          onClick={() => setSelectedTab(TABS.COMPLETE)}
        >
          Complete
        </button>
      </div>

      <div className="space-y-3">
        <GoalList
          goals={displayedGoals}
          emptyMessage={
            goals.length === 0
              ? "No Goals"
              : selectedTab === TABS.INCOMPLETE
              ? "All Done!"
              : "No Completed Goals"
          }
          availableTags={availableTags}
          progressMap={progressMap}
          statusColor={getDeadlineColor}
        />
      </div>

      <div className="mt-6">
        <button
          className="btn w-full bg-violet-600 hover:bg-violet-700 text-white rounded-xl"
          onClick={() => navigate("/addGoal")}
        >
          Add New Goal
        </button>
      </div>
    </div>
  );
}
