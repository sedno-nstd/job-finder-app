"use client";
import { useEffect, useState } from "react";
import { EmployerVacancyList } from "../dashboard/EmployerVacancyList";
import { EmployerVacancy } from "@/src/types/employer";
import { GetVacancies } from "@/src/actions/employer/vacancies/getEmployerVacancies";
import { useVacancyFilter } from "@/src/hooks/employer/useVacanciesFilter";
import { sortOptions } from "./constans/type";
import clsx from "clsx";

interface Props {
  className?: string;
  vacancyClassName?: string;
}

export function VacanciesPage({ vacancyClassName, className }: Props) {
  const [data, setData] = useState<EmployerVacancy[]>([]);
  const [error, setError] = useState(false);

  const { displayData, handleShowMore, hasMore, setSortBy, sortBy, total } =
    useVacancyFilter(data);

  useEffect(() => {
    const handleGetVacancies = async () => {
      const res = await GetVacancies();
      if (!res) {
        setError(true);
        return;
      }
      setData(res);
    };
    handleGetVacancies();
  }, []);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {error ? (
        <h1 className="animate-pulse text-gray-500">Somethind went wrong</h1>
      ) : (
        <div className={clsx("flex flex-col w-full gap-6", className)}>
          <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl shadow-sm">
            <span className="text-sm text-gray-500 mr-2">Sort:</span>
            {sortOptions?.map((option) => (
              <button
                type="button"
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={clsx(
                  "px-4 py-1.5 rounded-full cursor-pointer text-sm font-medium transition-all",
                  sortBy === option.value
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                )}
              >
                {option.label}
              </button>
            ))}
            <div className="ml-auto text-sm text-gray-400">
              Total: <b>{total}</b>
            </div>
          </div>

          <EmployerVacancyList
            className={vacancyClassName}
            vacancies={displayData}
            showMore={handleShowMore}
            hasMore={hasMore}
          />
        </div>
      )}
    </div>
  );
}
