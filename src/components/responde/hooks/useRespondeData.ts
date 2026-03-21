import { useMemo, useState } from "react";
import { SortType } from "../constans/type";
import { Vacancy } from "@prisma/client";

export function useRespondeData(initialVacancies: Vacancy[]) {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [sortType, setSortBy] = useState<SortType>("newest");

  const filteredVacancies = useMemo(() => {
    const filtered = initialVacancies.filter((v) => {
      const matchesTitle = v.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const matchesCompany = v.company
        .toLowerCase()
        .includes(searchCompany.toLowerCase());
      return matchesTitle && matchesCompany;
    });

    return filtered.sort((a, b) => {
      const timeA = new Date(a.postedAt).getTime();
      const timeB = new Date(b.postedAt).getTime();
      return sortType === "newest" ? timeB - timeA : timeA - timeB;
    });
  }, [initialVacancies, searchTitle, searchCompany, sortType]);

  return {
    searchTitle,
    setSearchTitle,
    searchCompany,
    setSearchCompany,
    sortType,
    setSortBy,
    filteredVacancies,
  };
}
