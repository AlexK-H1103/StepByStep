import { useLocalStorage } from "./useLocalStorage";
import { sanitizeTags } from "../utils/sanitizeData";

export const useTags = (removeTagFromGoals) => {
  const [availableTags, setAvailableTags] = useLocalStorage(
    "tags",
    [],
    sanitizeTags
  );

  const addTag = (tag = {}) => {
    setAvailableTags((prev) => [
      ...prev,
      {
        id: tag.id ?? crypto.randomUUID(),
        name: tag.name ?? "",
        color: tag.color ?? "gray",
      },
    ]);
  };

  const updateTag = (updated) => {
    setAvailableTags((prev) =>
      prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
    );
  };

  const removeTag = (tagId) => {
    setAvailableTags((prev) => prev.filter((t) => t.id !== tagId));
    removeTagFromGoals?.(tagId);
  };

  return {
    availableTags,
    addTag,
    updateTag,
    removeTag,
  };
};
