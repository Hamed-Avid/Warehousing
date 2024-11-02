export default function TextAreaField({ label, name, error, register }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-primary md:w-auto">
        {label}
      </label>
      <textarea
        type="text"
        name={name}
        {...register(`${name}`)}
        className="w-full rounded-xl border border-secondary bg-transparent p-2 text-secondary"
      ></textarea>
      {error && <span className="text-danger">{error?.message}</span>}
    </div>
  );
}
