import { useNavigate } from "react-router-dom";
import Progress from "../Progress";

export default function Goal({
  id,
  text,
  completed,
  progress,
  tags = [],
  availableTags = [],
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/goals/${id}`)}
      className={`card bg-base-100 border border-base-300 shadow-sm hover:shadow-md transition-all cursor-pointer ${
        completed ? "opacity-75" : ""
      }`}
    >
      <div className="card-body flex flex-row justify-between items-start p-5">
        <div className="flex flex-col flex-grow gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{text}</h3>
            {completed && (
              <span className="badge badge-success">Completed</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((tagId) => {
                const tag = availableTags.find((t) => t.id === tagId);
                if (!tag) return null;
                return (
                  <span
                    key={tag.id}
                    className="badge"
                    style={{ backgroundColor: tag.color, color: "#fff" }}
                  >
                    {tag.name}
                  </span>
                );
              })
            ) : (
              <span className="text-gray-400 italic text-sm">No tags</span>
            )}
          </div>
        </div>

        <div className="ml-4 flex-shrink-0 w-20 flex flex-col justify-center">
          <Progress percentage={progress} />
        </div>
      </div>
    </div>
  );
}
