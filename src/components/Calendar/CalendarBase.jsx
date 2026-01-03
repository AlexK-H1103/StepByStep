import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function CalendarBase({
  selected,
  onSelect,
  loggedDates,
  dueDates,
}) {
  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={(date) => {
        if (!date) return;
        onSelect?.(date);
      }}
      modifiers={{
        logged: loggedDates,
        goalDue: dueDates,
      }}
      modifiersStyles={{
        logged: {
          backgroundColor: "#a78bfa",
          color: "white",
          borderRadius: "50%",
        },
        goalDue: {
          position: "relative",
        },
      }}
      modifiersClassNames={{
        goalDue: "goal-dot",
      }}
      className="rounded-lg w-full font-semibold text-violet-800"
      styles={{
        caption: { textAlign: "center" },
      }}
    />
  );
}
