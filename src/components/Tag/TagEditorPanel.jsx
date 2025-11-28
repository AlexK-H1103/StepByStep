import { useState } from "react";
import ColorPalette from "../ui/ColorPalette";

export default function TagEditorPanel({
  tag,
  editing,
  onClose,
  updateTag,
  removeTag,
}) {
  const [name, setName] = useState(tag.name);
  const [color, setColor] = useState(tag.color);

  const handleSave = () => {
    updateTag({ ...tag, name, color });
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm("Delete this tag completely?")) {
      removeTag(tag.id);
    }
  };

  return (
    <div
      className={`transition-all overflow-hidden ${
        editing ? "max-h-60 mt-2" : "max-h-0"
      }`}
    >
      {editing && (
        <div className="border border-base-300 rounded-lg p-3 space-y-3">
          <div className="flex items-center gap-2">
            <label className="text-sm w-16">Name</label>
            <input
              type="text"
              className="input input-sm input-bordered flex-grow"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm w-16">Color</label>
            <ColorPalette
              value={color}
              onChange={setColor}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sm"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-error"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
