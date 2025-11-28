export function getContrastTextColor(hex) {
  if (!hex) return "#000";
  const r = parseInt(hex.substr(1, 2), 16);
  const g = parseInt(hex.substr(3, 2), 16);
  const b = parseInt(hex.substr(5, 2), 16);
  const brightness = r * 0.299 + g * 0.587 + b * 0.114;
  return brightness > 160 ? "#000000" : "#ffffff";
}

const PRESET_COLORS = [
  "#EF4444",
  "#F97316",
  "#FACC15",
  "#4ADE80",
  "#22C55E",
  "#2DD4BF",
  "#38BDF8",
  "#3B82F6",
  "#6366F1",
  "#A855F7",
  "#EC4899",
  "#94A3B8",
];

export default function ColorPalette({
  value,
  onChange,
  colors = PRESET_COLORS,
  size = "md",
  gridMode = false,
}) {
  const btnSize = size === "sm" ? "w-8 h-8" : "w-10 h-10";
  return (
    <div
      className={
        gridMode ? "grid grid-cols-3 gap-2 w-max" : "flex flex-wrap gap-2"
      }
    >
      {colors.map((color) => {
        const selected = color === value;
        const textColor = getContrastTextColor(color);
        return (
          <button
            type="button"
            key={color}
            className={`
              ${btnSize} rounded-full border flex items-center justify-center
              transition-all
              ${selected ? "ring-2 ring-offset-2 ring-blue-500 scale-110" : ""}
            `}
            style={{
              backgroundColor: color,
              color: textColor,
              minWidth: "0",
            }}
            onClick={() => onChange(color)}
          >
            {selected ? "✓" : ""}
          </button>
        );
      })}
    </div>
  );
}

ColorPalette.COLORS = PRESET_COLORS;
