import GoalList from "../components/Goal/GoalList";
import MiniCalendar from "../components/Calendar/MiniCalendar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home({
  goals,
  availableTags,
  progressMap,
  statusColor,
}) {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

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
    <div className="min-h-screen bg-base-200 flex justify-center items-start py-10">
      <div className="flex w-full max-w-6xl gap-6 items-center">
        <div className="bg-base-100 shadow-lg rounded-xl p-6 flex-[2] space-y-6">
          <div className="tabs w-full justify-center mb-4">
            <a
              className={`tab tab-lifted ${
                selectedTab === TABS.INCOMPLETE ? "tab-active" : ""
              }`}
              onClick={() => setSelectedTab(TABS.INCOMPLETE)}
            >
              Incomplete
            </a>
            <a
              className={`tab tab-lifted ${
                selectedTab === TABS.COMPLETE ? "tab-active" : ""
              }`}
              onClick={() => setSelectedTab(TABS.COMPLETE)}
            >
              Complete
            </a>
          </div>

          <GoalList
            goals={displayedGoals}
            emptyMessage={
              selectedTab === TABS.INCOMPLETE
                ? "All Done!"
                : "No Completed Goals"
            }
            availableTags={availableTags}
            progressMap={progressMap}
            statusColor={statusColor}
          />

          <button
            className="btn btn-neutral w-full"
            onClick={() => navigate("/addGoal")}
          >
            Add New Goal
          </button>
        </div>
        <div className="flex-[1] flex justify-center">
          <MiniCalendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
        </div>
      </div>
    </div>
  );
}
