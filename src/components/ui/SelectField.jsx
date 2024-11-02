export default function SelectField({ label, name, error, register, options }) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="mb-1 block font-medium text-slate-800 dark:text-slate-400"
      >
        {label}
      </label>
      <select
        {...register(name)}
        className="w-full rounded-xl border border-slate-500 bg-transparent px-3 py-2 font-medium text-slate-800 dark:text-slate-400"
      >
        <option
          className="bg-slate-300 font-medium text-slate-600 dark:bg-slate-500 dark:text-slate-300"
          value=""
        >
          select a {name}
        </option>
        {options?.map(({ id, title }) => (
          <option key={id} value={id} className="bg-slate-500 text-slate-300">
            {title}
          </option>
        ))}
      </select>
      {error && <span className="text-danger">{error.message}</span>}
    </div>
  );
}
