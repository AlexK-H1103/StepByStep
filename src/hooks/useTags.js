import { useLocalStorage } from "./useLocalStorage";

export const useTags = () => {
  const [availableTags, setAvailableTags] = useLocalStorage("tags", []);

  const addTag = (tag) => {
    setAvailableTags((prev) => [...prev, tag]);
  };

  const removeTag = (id) => {
    setAvailableTags((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTag = (updated) => {
    setAvailableTags((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  return { availableTags, addTag, removeTag, updateTag };
};
