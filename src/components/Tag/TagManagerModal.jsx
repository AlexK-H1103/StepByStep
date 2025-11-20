import { useState } from "react";
import { getContrastTextColor } from "../UI/ColorPalette";
import TagEditorPanel from "./TagEditorPanel";

export default function TagManagerModal({
  isOpen,
  onClose,
  availableTags,
  removeTag,
  updateTag,
}) {
  const [expandedId, setExpandedId] = useState(null);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-lg space-y-4">
        <h2 className="text-lg font-bold">Manage Tags</h2>

        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <span
              key={tag.id}
              className="badge text-white cursor-pointer"
              style={{
                backgroundColor: tag.color,
                color: getContrastTextColor(tag.color),
              }}
              onClick={() =>
                setExpandedId(expandedId === tag.id ? null : tag.id)
              }
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {availableTags.map((tag) => (
            <TagEditorPanel
              key={tag.id}
              tag={tag}
              expanded={expandedId === tag.id}
              onClose={() => setExpandedId(null)}
              updateTag={updateTag}
              removeTag={removeTag}
            />
          ))}
        </div>

        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
