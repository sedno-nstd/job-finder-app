import { useMemo, useState } from "react";
import { EmployerVacancy } from "@/src/types/employer";

export type SortType = "latest" | "oldest" | "popular" | "most applications";

export function useVacancyFilter(vacancies: EmployerVacancy[]) {
  const [sortBy, setSortBy] = useState<SortType>("latest");
  const [count, setCount] = useState(5);

  const sorters = {
    latest: (a: EmployerVacancy, b: EmployerVacancy) =>
      new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),

    oldest: (a: EmployerVacancy, b: EmployerVacancy) =>
      new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime(),

    popular: (a: EmployerVacancy, b: EmployerVacancy) => b.views - a.views,

    "most applications": (a: EmployerVacancy, b: EmployerVacancy) =>
      b.application.length - a.application.length,
  };
  const filteredData = useMemo(() => {
    return [...vacancies].sort(sorters[sortBy]);
  }, [vacancies, sortBy]);

  const displayData = useMemo(() => {
    return filteredData.slice(0, count);
  }, [filteredData, count]);

  const handleShowMore = () => setCount((prev) => prev + 5);

  return {
    sortBy,
    setSortBy,
    displayData,
    handleShowMore,
    hasMore: count < filteredData.length,
    total: filteredData.length,
  };
}
