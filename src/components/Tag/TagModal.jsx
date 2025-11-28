import { useState, useMemo } from "react";
import ColorPalette, { getContrastTextColor } from "../ui/ColorPalette";

export default function TagModal({
  isOpen,
  onClose,
  availableTags,
  selectedTags,
  setSelectedTags,
  addTag,
}) {
  const [input, setInput] = useState("");
  const [newColor, setNewColor] = useState("#EF4444");

  if (!isOpen) return null;

  const filteredTags = useMemo(() => {
    return availableTags.filter((tag) =>
      tag.name.toLowerCase().includes(input.toLowerCase())
    );
  }, [input, availableTags]);

  const toggleTag = (id) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter((t) => t !== id));
      return;
    }
    if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, id]);
    }
  };

  const handleCreate = () => {
    const name = input.trim();
    if (!name) return;
    const newTag = {
      id: crypto.randomUUID(),
      name,
      color: newColor,
    };
    addTag(newTag);
    setSelectedTags([...selectedTags, newTag.id].slice(0, 3));
    setInput("");
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box space-y-4">
        <h3 className="font-bold text-lg">Edit Tags</h3>

        <div className="flex flex-wrap gap-2">
          {selectedTags.map((id) => {
            const t = availableTags.find((x) => x.id === id);
            if (!t) return null;
            return (
              <span
                key={id}
                className="px-2 py-1 badge "
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

        <input
          type="text"
          className="input input-bordered w-full"
          value={input}
          placeholder="Search or create new tag"
          onChange={(e) => setInput(e.target.value)}
        />

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

        <div className="divider my-3">Available Tags</div>

        <div className="flex flex-wrap gap-2 ">
          {filteredTags.map((tag) => (
            <button
              key={tag.id}
              className={`px-2 py-1 badge  ${
                selectedTags.includes(tag.id)
                  ? "ring-2 ring-black"
                  : "opacity-70"
              }`}
              style={{
                backgroundColor: tag.color,
                color: getContrastTextColor(tag.color),
              }}
              onClick={() => toggleTag(tag.id)}
            >
              {tag.name}
            </button>
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
