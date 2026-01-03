import { getLocalDateKey } from "./dateUtils";

const sanitizeStep = (step = {}) => ({
  id: typeof step.id === "string" ? step.id : crypto.randomUUID(),
  text: typeof step.text === "string" ? step.text : "",
  completed: !!step.completed,
});

export const sanitizeGoal = (goal = {}) => {
  if (typeof goal.id !== "string") return null;

  return {
    id: goal.id,
    text: typeof goal.text === "string" ? goal.text : "",
    dueDate: typeof goal.dueDate === "string" ? goal.dueDate : null,
    completed: !!goal.completed,
    steps: Array.isArray(goal.steps) ? goal.steps.map(sanitizeStep) : [],
    tags: Array.isArray(goal.tags)
      ? goal.tags.filter((id) => typeof id === "string")
      : [],
    createdAt: typeof goal.createdAt === "number" ? goal.createdAt : Date.now(),
  };
};

export const sanitizeGoals = (goals) =>
  Array.isArray(goals) ? goals.map(sanitizeGoal) : [];

export const sanitizeTags = (tags = []) => {
  if (!Array.isArray(tags)) return [];

  return tags
    .filter((t) => t && typeof t === "object")
    .map((t) => ({
      id: typeof t.id === "string" ? t.id : crypto.randomUUID(),
      name: typeof t.name === "string" ? t.name : "",
      color: typeof t.color === "string" ? t.color : "gray",
    }));
};

const sanitizeTodo = (todo = {}) => ({
  id: typeof todo.id === "string" ? todo.id : crypto.randomUUID(),
  text: typeof todo.text === "string" ? todo.text : "",
  completed: !!todo.completed,
  createdAt: typeof todo.createdAt === "number" ? todo.createdAt : Date.now(),
});

export const sanitizeDaily = (daily = {}) => ({
  date: typeof daily.date === "string" ? daily.date : getLocalDateKey(),
  todos: Array.isArray(daily.todos) ? daily.todos.map(sanitizeTodo) : [],
  log: typeof daily.log === "string" ? daily.log : "",
  isDone: !!daily.isDone,
});

export const sanitizeDailyStorage = (data = {}) => ({
  current: sanitizeDaily(data.current),
  history:
    typeof data.history === "object" && data.history !== null
      ? Object.fromEntries(
          Object.entries(data.history).map(([date, entry]) => [
            typeof date === "string" ? date : getLocalDateKey(),
            sanitizeDaily(entry),
          ])
        )
      : {},
});
