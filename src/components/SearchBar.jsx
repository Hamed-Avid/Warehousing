import { RiSearchLine } from "react-icons/ri";

const sortOptions = [
  { title: "Latest", value: "latest" },
  { title: "Earliest", value: "earliest" },
];

const SearchBar = ({ filters, categories, handler }) => {
  return (
    <section className="flex justify-center">
      <div className="mb-2 w-full">
        <div className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:gap-12">
          <div className="relative mr-3">
            <div className="absolute left-3 top-3 items-center">
              <RiSearchLine />
            </div>
            <input
              type="text"
              className="w-70 block rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-gray-900 outline-none"
              placeholder="Search Here..."
              value={filters.search}
              onChange={(e) => handler("search", e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center justify-between">
              <label className="mr-2 hidden text-lg text-slate-500 md:block">
                sort
              </label>
              <select
                className="rounded-xl border-2 border-secondary bg-transparent p-1 text-slate-400 outline-none"
                value={filters.sort}
                onChange={(e) => handler("sort", e.target.value)}
              >
                {sortOptions.map(({ title, value }, index) => (
                  <option
                    key={index}
                    className="bg-slate-500 text-slate-300"
                    value={value}
                  >
                    {title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="mr-2 hidden text-lg text-slate-500 md:block">
                Category
              </label>
              <select
                className="rounded-xl border-2 border-secondary bg-transparent p-1 text-slate-400 outline-none"
                value={filters.category}
                onChange={(e) => handler("category", e.target.value)}
              >
                <option className="bg-slate-500 text-slate-300" value="">
                  All
                </option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                    className="bg-slate-500 text-slate-300"
                  >
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
