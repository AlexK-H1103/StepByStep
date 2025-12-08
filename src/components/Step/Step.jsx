export default function Step({ step, onToggleStep, onRemoveStep }) {
  return (
    <div
      className={`flex items-center justify-between gap-2 text-gray-600 bg-violet-100 rounded-lg border border-gray-700 p-2 ${
        step.completed ? "opacity-70" : ""
      }`}
    >
      <label className="flex items-center gap-2 flex-grow cursor-pointer ">
        <input
          type="checkbox"
          className="checkbox checkbox-neutral"
          checked={step.completed}
          onChange={() => onToggleStep(step.id)}
        />
        {step.text}
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
