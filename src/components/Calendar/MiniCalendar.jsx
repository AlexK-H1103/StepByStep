import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export default function MiniCalendar({ selectedDate, onSelectDate }) {
  return (
    <div className="bg-base-100 p-4 rounded-lg shadow-md w-full">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={onSelectDate}
        className="rounded-lg w-full"
        styles={{
          caption: { textAlign: "center" },
        }}
      />
    </div>
  );
}
