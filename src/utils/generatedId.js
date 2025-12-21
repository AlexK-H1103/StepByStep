export const generateId = () =>
  crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
