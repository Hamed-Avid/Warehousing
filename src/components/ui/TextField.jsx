export default function TextField({
  label,
  name,
  error,
  register,
  type = "text",
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-primary md:w-auto">
        {label}
      </label>
      <input
        type={type}
        id={name}
        autoComplete="false"
        {...register(name)}
        className="w-full rounded-xl border border-secondary bg-transparent p-2 text-secondary md:w-auto"
      />
      {error && <span className="text-danger">{error?.message}</span>}
    </div>
  );
}
