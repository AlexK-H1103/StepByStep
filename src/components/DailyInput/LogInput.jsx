export default function LogInput({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <textarea
        className="w-full p-2 border rounded text-gray-500 bg-violet-100"
        placeholder="How was your day..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
