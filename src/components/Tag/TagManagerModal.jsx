import { useState, useMemo } from "react";
import ColorPalette, { getContrastTextColor } from "../ui/ColorPalette";
import TagEditorPanel from "./TagEditorPanel";

export default function TagManagerModal({
  isOpen,
  onClose,
  availableTags,
  removeTag,
  updateTag,
  addTag,
  selectMode = false,
  selectedTags = [],
  setSelectedTags = () => {},
  maxSelect = 3,
}) {
  const [editingId, setEditingId] = useState(null);
  const [input, setInput] = useState("");
  const [newColor, setNewColor] = useState("#EF4444");

  const filteredTags = useMemo(() => {
    const list = availableTags || [];
    if (!selectMode) return list;
    return list.filter((tag) =>
      tag.name.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, availableTags, selectMode]);

  const handleCreate = () => {
    const name = input.trim();
    if (!name) return;
    const newTag = {
      id: crypto.randomUUID(),
      name,
      color: newColor,
    };

    addTag(newTag);
    if (selectMode) {
      setSelectedTags([...selectedTags, newTag.id].slice(0, maxSelect));
    }
    setInput("");
    setNewColor("#EF4444");
  };

  const handleClose = () => {
    setInput("");
    setEditingId(null);
    onClose();
  };

  const onTagClick = (tag) => {
    if (!selectMode) {
      setEditingId(editingId === tag.id ? null : tag.id);
      return;
    }
    if (selectedTags.includes(tag.id)) {
      setSelectedTags(selectedTags.filter((x) => x !== tag.id));
    } else if (selectedTags.length < maxSelect) {
      setSelectedTags([...selectedTags, tag.id]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box bg-gray-700 border border-gray-700 rounded-2xl shadow-lg w-full max-w-lg space-y-4">
        <h3 className="text-lg text-gray-100 font-bold">
          {selectMode ? "Edit Tags" : "Manage Tags"}
        </h3>
        {selectMode && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((id) => {
              const t = availableTags.find((x) => x.id === id);
              if (!t) return null;
              return (
                <span
                  key={id}
                  className="px-2 py-1 badge"
                  style={{
                    backgroundColor: t.color,
                    color: getContrastTextColor(t.color),
                  }}
                >
                  {t.name}
                </span>
              );
            })}
          </div>
        )}
        <div className="space-y-2">
          <input
            type="text"
            className="input input-bordered w-full text-gray-400 bg-violet-100"
            value={input}
            placeholder={
              selectMode ? "Search or create new tag" : "Create new tag"
            }
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
              className="btn btn-sm bg-violet-600 hover:bg-violet-700 text-white rounded-xl disabled:bg-gray-400"
              onClick={handleCreate}
            >
              Create "{input}"
            </button>
          </div>
        )}

        <div className="divider my-2"></div>

        <div className="flex flex-wrap gap-2">
          {filteredTags.map((tag) => (
            <button
              key={tag.id}
              className={`px-2 py-1 badge cursor-pointer ${
                selectMode && selectedTags.includes(tag.id)
                  ? "ring-2 ring-black"
                  : ""
              }`}
              style={{
                backgroundColor: tag.color,
                color: getContrastTextColor(tag.color),
              }}
              onClick={() => onTagClick(tag)}
            >
              {tag.name}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {!selectMode && (
            <div className="space-y-2">
              {availableTags.map((tag) => (
                <TagEditorPanel
                  key={tag.id}
                  tag={tag}
                  editing={editingId === tag.id}
                  onClose={handleClose}
                  updateTag={updateTag}
                  removeTag={removeTag}
                />
              ))}
            </div>
          )}
        </div>

        <div className="modal-action">
          <button
            className="btn btn-outline text-white rounded-xl"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
