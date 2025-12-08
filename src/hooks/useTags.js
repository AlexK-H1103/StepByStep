import { useLocalStorage } from "./useLocalStorage";

export const useTags = (removeTagFromGoals) => {
  const [availableTags, setAvailableTags] = useLocalStorage("tags", []);

  const validateTag = (tag) => {
    return tag && typeof tag.id === "string" && typeof tag.name === "string";
  };

  const addTag = (tag) => {
    if (!validateTag(tag)) {
      console.error("Invalid tag structure:", tag);
      return;
    }

    setAvailableTags((prev) => {
      if (prev.some((t) => t.id === tag.id)) {
        console.warn("Tag already exists:", tag.id);
        return prev;
      }
      return [...prev, tag];
    });
  };

  const updateTag = (updated) => {
    if (!validateTag(updated)) return;

    setAvailableTags((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const removeTag = (tagId) => {
    setAvailableTags((prev) => prev.filter((t) => t.id !== tagId));
    if (typeof removeTagFromGoals === "function") {
      removeTagFromGoals(tagId);
    }
  };

  return {
    availableTags,
    addTag,
    updateTag,
    removeTag,
  };
};
