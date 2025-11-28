import { useState } from "react";
import ColorPalette, { getContrastTextColor } from "../ui/ColorPalette";
import TagEditorPanel from "./TagEditorPanel";

export default function TagManagerModal({
  isOpen,
  onClose,
  availableTags,
  removeTag,
  updateTag,
  addTag,
}) {
  const [editingId, setEditingId] = useState(null);
  const [input, setInput] = useState("");
  const [newColor, setNewColor] = useState("#EF4444");

  if (!isOpen) return null;

  const handleCreate = () => {
    const name = input.trim();
    if (!name) return;
    const newTag = {
      id: crypto.randomUUID(),
      name,
      color: newColor,
    };

    addTag(newTag);
    setInput("");
    setNewColor("#EF4444");
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box w-full max-w-lg space-y-4">
        <h2 className="text-lg font-bold">Manage Tags</h2>
        <div className="space-y2">
          <input
            type="text"
            className="input input-border w-full"
            placeholder="Create new tag"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        {input.trim() && (
          <div className="flex items-center gap-2">
            <ColorPalette
              value={newColor}
              onChange={setNewColor}
            />
            <button
              className="btn btn-neutral btn-sm"
              onClick={handleCreate}
            >
              Create "{input}"
            </button>
          </div>
        )}

        <div className="divider my-2"></div>

        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <span
              key={tag.id}
              className="badge text-white cursor-pointer"
              style={{
                backgroundColor: tag.color,
                color: getContrastTextColor(tag.color),
              }}
              onClick={() => setEditingId(editingId === tag.id ? null : tag.id)}
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
              editing={editingId === tag.id}
              onClose={() => setEditingId(null)}
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
