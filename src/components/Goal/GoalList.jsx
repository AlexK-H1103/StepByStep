import Goal from "./Goal";

export default function GoalList({
  goals,
  emptyMessage,
  availableTags,
  progressMap,
  statusColor,
}) {
  if (!goals || goals.length === 0)
    return (
      <p className="text-center text-gray-500 text-sm italic">{emptyMessage}</p>
    );

  return (
    <div className="space-y-4">
      {goals.map((g) => (
        <Goal
          key={g.id}
          id={g.id}
          text={g.text}
          completed={g.completed}
          tags={g.tags}
          dueDate={g.dueDate}
          progress={progressMap?.[g.id] ?? 0}
          availableTags={availableTags}
          statusColor={statusColor}
        />
      ))}
    </div>
  );
}
