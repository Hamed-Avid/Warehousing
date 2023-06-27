import { useRef } from "react";

const SearchBar = ({ filters, categories, onSort, onSearch, onCategory }) => {
  const clickPoint = useRef();

  const handleFocus = () => {
    clickPoint.current.style.display = "none";
  };

  const handleBlur = () => {
    clickPoint.current.style.display = "block";
  };

  return (
    <section className="flex justify-center">
      <div className="mb-2 w-full">
        <div className="px-4 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-12">
          <div className="relative mr-3">
            <div
              className="absolute top-3 left-3 items-center"
              ref={clickPoint}
            >
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              className="block p-2 pl-10 w-70 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
              placeholder="Search Here..."
              onFocus={handleFocus}
              onBlur={handleBlur}
              value={filters.search}
              onChange={onSearch}
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center justify-between">
              <label className="hidden md:block text-slate-500 text-lg mr-2">
                sort
              </label>
              <select
                className="bg-transparent border-2 text-slate-400 rounded-xl"
                value={filters.sort}
                onChange={onSort}
              >
                <option className="bg-slate-500 text-slate-300" value="latest">
                  latest
                </option>
                <option className="bg-slate-500 text-slate-300" value="oldest">
                  oldest
                </option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="hidden md:block text-slate-500 text-lg mr-2">
                Category
              </label>
              <select
                className="bg-transparent border-2 text-slate-400 rounded-xl"
                onChange={onCategory}
                value={categories.id}
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
