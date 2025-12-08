import { useNavigate } from "react-router-dom";
import Progress from "../ui/Progress";
import { getContrastTextColor } from "../ui/ColorPalette";

export default function Goal({
  id,
  text,
  completed,
  progress,
  tags = [],
  availableTags = [],
  dueDate,
  statusColor,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/goals/${id}`)}
      className={`card bg-violet-100 border border-violet-200 rounded-2xl shadow-sm 
        hover:shadow-violet-400/40 hover:-translate-y-1 
        transition-all cursor-pointer
        p-5 mb-4 ${completed ? "opacity-75" : ""}`}
    >
      <div className="card-body flex flex-row justify-between items-start ">
        <div className="flex flex-col flex-grow gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-lg font-semibold text-violet-800">{text}</h3>
            {dueDate ? (
              <span
                className={` text-xs px-2 py-1 rounded-md font-medium ${statusColor(
                  dueDate
                )}`}
              >
                ({dueDate})
              </span>
            ) : (
              <span
                className={` text-xs px-2 py-1 rounded-md font-medium ${statusColor(
                  dueDate
                )}`}
              >
                (No due date)
              </span>
            )}

            {completed && (
              <span className="badge badge-success text-xs">Completed</span>
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
                    className="badge px-2 py-1 rounded-full text-xs font-medium shadow-sm"
                    style={{
                      backgroundColor: tag.color,
                      color: getContrastTextColor(tag.color),
                    }}
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
