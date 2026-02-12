import { vacancies } from "@/src/domain/vacancy/types";
import { useSearchStore } from "@/src/store/useSearchStore";
import { UseVacanciesCount } from "@/src/store/useVacanciesCount";
import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";

interface Props {
  className: string;
}

export function VacancyCount({ className }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  const Data = vacancies.map((item) => {
    return {
      id: item.id,
      title: item.title,
      city: item.city,
      country: item.country,
    };
  });

  const { finalSearch } = useSearchStore();

  const count = useMemo(() => {
    const { count: result } = UseVacanciesCount({
      vacancy: Data,
      query: finalSearch.prof,
      region: finalSearch.loc,
    });
    return result;
  }, [finalSearch, Data]);

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
      <span>{count} vacancies</span>
    </div>
  );
}
