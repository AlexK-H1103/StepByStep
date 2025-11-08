export default function Progress({ percentage }) {
  const color =
    percentage === 100
      ? "text-success"
      : percentage > 0
      ? "text-primary"
      : "text-base-content/40";

  return (
    <div
      className={`radial-progress ${color} text-sm font-semibold transition-all duration-300`}
      style={{
        "--value": percentage,
        "--size": "2.75rem",
        "--thickness": "4px",
      }}
      role="progressbar"
      aria-label={`Progress: ${percentage}%`}
    >
      {percentage}%
    </div>
  );
}
