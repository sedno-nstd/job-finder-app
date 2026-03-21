import { GetAllVacancies } from "@/src/actions/vacancies/GetAllVacancies";
import { useSearchStore } from "@/src/store/useSearchStore";
import { getFilteredVacancies } from "@/src/utils/vacancy-filters";
import { Vacancy } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

interface Props {
  className: string;
}

export function VacancyCount({ className }: Props) {
  const [vacancies, setVacancies] = useState<Vacancy[] | null>(null);

  useEffect(() => {
    const handleGEtVacancies = async () => {
      const res = await GetAllVacancies();

      if (!res) console.log("Error to get vacancies");

      setVacancies(res as unknown as Vacancy[]);
    };

    handleGEtVacancies();
  }, []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const { finalSearch } = useSearchStore();

  const filteredCount = useMemo(() => {
    const filtered = getFilteredVacancies(
      vacancies || [],
      finalSearch.prof,
      finalSearch.loc,
    );
    return filtered.length;
  }, [finalSearch.prof, finalSearch.loc]);

  if (!ready) return null;
  const isNothingEntered =
    finalSearch.prof.trim() === "" && finalSearch.loc.trim() === "";

  if (isNothingEntered) {
    return (
      <div className="flex flex-col mb-4">
        <span className="text-3xl text-main font-semibold">
          Search for a dream job
        </span>
        <span>Start typing title or location...</span>
      </div>
    );
  }

  const capitalizedQuery = finalSearch.prof
    ? finalSearch.prof[0].toUpperCase() + finalSearch.prof.slice(1)
    : "All";

  return (
    <div className={clsx("text-main", className)}>
      <span className="text-3xl font-semibold">
        Work {ready && capitalizedQuery}
      </span>
      <span>{filteredCount} vacancies</span>
    </div>
  );
}
