export default function Button({
  label,
  handler,
  isPrimary = false,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={handler}
      className={`flex-1 rounded-lg border-2 border-secondary px-4 py-2 ${isPrimary ? "hover:bg=primary bg-secondary text-tertiary" : "hover:bg=secondary border-secondary text-primary"}`}
    >
      {label}
    </button>
  );
}
