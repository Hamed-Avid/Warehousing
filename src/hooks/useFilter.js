import { useMemo } from "react";

export default function useFiltered(items, filters, currentPage) {
  const countPerPage = Math.floor(screen.availHeight / 135);

  const { filtered, totalPages } = useMemo(() => {
    const result = items
      .filter(
        ({ title, categoryId }) =>
          title.toLowerCase().includes(filters.search) &&
          (!filters.category || categoryId === parseInt(filters.category)),
      )
      .sort((a, b) =>
        filters.sort === "latest"
          ? a.createdAt > b.createdAt
            ? -1
            : 1
          : b.createdAt > a.createdAt
            ? -1
            : 1,
      );

    return {
      filtered: result.slice(
        (currentPage - 1) * countPerPage,
        currentPage * countPerPage,
      ),
      totalPages: Math.ceil(result.length / countPerPage),
    };
  }, [items, filters, currentPage, countPerPage]);

  return { filtered, totalPages };
}
