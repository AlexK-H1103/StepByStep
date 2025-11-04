export default function Checkbox({
  id,
  label,
  checked,
  onChange,
  className = "",
}) {
  const inputId = `checkbox-${id}`;
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <input
        id={inputId}
        type="checkbox"
        className="checkbox checkbox-neutral"
        checked={checked}
        onChange={() => onChange(id)}
      />
      {label && (
        <label
          htmlFor={inputId}
          className="label-text cursor-pointer"
        >
          {label}
        </label>
      )}
    </div>
  );
}
