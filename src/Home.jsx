import { useNavigate } from "react-router-dom";
import GoalList from "./GoalList";

export default function Home({ goals }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 flex justify-center items-start py-10">
      <div className="bg-base-100 shadow-lg rounded-xl p-6 w-full max-w-md space-y-6">
        <GoalList goals={goals} />
        <button
          className="btn btn-neutral w-full "
          onClick={() => navigate("/addGoal")}
        >
          Add New Goal
        </button>
      </div>
    </div>
  );
}
