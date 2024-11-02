export default function Pagination({ page, totalPages, pageHandler }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex items-center justify-center rounded-[10px] p-2">
      <div className="flex gap-x-[10px]">
        <button
          onClick={() => page > 1 && pageHandler(page - 1)}
          className={`${
            page === 1
              ? "cursor-default border-secondary text-secondary"
              : "border-primary text-primary"
          } flex h-8 items-center justify-center rounded-[5px] border px-4`}
        >
          Prev
        </button>
        <ul className="flex items-center gap-x-[10px]">
          {pages.map((number) => (
            <li
              key={number}
              onClick={() => pageHandler(number)}
              className={`${
                number === page
                  ? "cursor-default border-secondary text-secondary"
                  : "cursor-pointer border-primary text-primary"
              } hover:border-yellow border-milky flex h-8 w-6 items-center justify-center rounded-[5px] border text-center`}
            >
              {number}
            </li>
          ))}
        </ul>
        <button
          onClick={() => page < totalPages && pageHandler(page + 1)}
          className={`${
            page === totalPages
              ? "cursor-default border-secondary text-secondary"
              : "border-primary text-primary"
          } flex h-8 items-center justify-center rounded-[5px] border px-4`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
