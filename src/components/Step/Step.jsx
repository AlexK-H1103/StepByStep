export default function Step({ step, onToggleStep, onRemoveStep }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-base-300 p-2">
      <label className="flex items-center gap-2 flex-grow">
        <input
          type="checkbox"
          className="checkbox checkbox-neutral"
          checked={step.completed}
          onChange={() => onToggleStep(step.id)}
        />
        <span className={`truncate ${step.completed ? "text-gray-500" : ""}`}>
          {step.text}
        </span>
      </label>
      <button
        onClick={() => onRemoveStep(step.id)}
        className="btn btn-xs btn-outline btn-error"
        title="Remove step"
      >
        ✕
      </button>
    </div>
  );
}
