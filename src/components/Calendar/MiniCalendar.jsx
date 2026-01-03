import { useNavigate } from "react-router-dom";
import CalendarBase from "./CalendarBase";
import { getLocalDateKey } from "../../utils/dateUtils";

export default function MiniCalendar({ loggedDates, dueDates }) {
  const navigate = useNavigate();
  const handleSelectDate = (date) => {
    if (!date) return;
    const key = getLocalDateKey(date);
    navigate(`/calendar?date=${key}`);
  };

  return (
    <div className="bg-violet-100 border border-violet-100 p-4 rounded-lg shadow-md w-full">
      <CalendarBase
        loggedDates={loggedDates}
        dueDates={dueDates}
        onSelect={handleSelectDate}
      />
    </div>
  );
}
