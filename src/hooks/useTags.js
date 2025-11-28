import { useLocalStorage } from "./useLocalStorage";
import { useGoals } from "./useGoals";

export const useTags = () => {
  const [availableTags, setAvailableTags] = useLocalStorage("tags", []);
  const { goals, updateGoal } = useGoals();

  const addTag = (tag) => {
    setAvailableTags((prev) => [...prev, tag]);
  };

  const updateTag = (updated) => {
    setAvailableTags((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const removeTag = (tagId) => {
    setAvailableTags((prev) => prev.filter((t) => t.id !== tagId));

    if (updateGoal && goals.length) {
      goals.forEach((goal) => {
        if (goal.tags?.includes(tagId)) {
          updateGoal({
            ...goal,
            tags: goal.tags.filter((id) => id !== tagId),
          });
        }
      });
    }
  };

  return { availableTags, addTag, updateTag, removeTag };
};
