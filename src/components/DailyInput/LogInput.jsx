export default function LogInput({ value, onChange }) {
  return (
    <textarea
      className="w-full p-2 border rounded text-black bg-violet-100"
      placeholder="How was your day..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
