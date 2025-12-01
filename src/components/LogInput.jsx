export default function LogInput({ value, onChange }) {
  return (
    <textarea
      className="w-full p-3 border rounded"
      placeholder="How was your day..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
