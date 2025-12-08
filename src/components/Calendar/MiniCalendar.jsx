import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function MiniCalendar({ selectedDate, onSelectDate }) {
  return (
    <div className="bg-violet-100 border border-violet-200 p-4 rounded-lg shadow-md w-full">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        className="rounded-lg w-full font-semibold text-violet-800"
        styles={{
          caption: { textAlign: "center" },
        }}
      />
    </div>
  );
}
