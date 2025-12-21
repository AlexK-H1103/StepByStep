import { DayPicker } from "react-day-picker";
import { useNavigate } from "react-router-dom";
import "react-day-picker/dist/style.css";

export default function MiniCalendar({ loggedDates, dueDates }) {
  const navigate = useNavigate();
  return (
    <div className="bg-violet-100 border border-violet-100 p-4 rounded-lg shadow-md w-full">
      <DayPicker
        mode="single"
        onDayClick={() => {
          navigate("/calendar");
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
    </div>
  );
}
