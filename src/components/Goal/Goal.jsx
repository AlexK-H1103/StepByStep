import { useNavigate } from "react-router-dom";
import Progress from "../Progress";

export default function Goal({ id, text, completed, progress }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/goals/${id}`)}
      className={`card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all cursor-pointer ${
        completed ? "opacity-75" : ""
      }`}
    >
      <div className="card-body flex flex-row justify-between items-center p-5">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{text}</h3>
          {completed && (
            <span className="badge badge-success mt-2 self-start">
              Completed
            </span>
          )}
        </div>
        <div className="ml-4 w-20">
          <Progress percentage={progress} />
        </div>
      </div>
    </div>
  );
}
