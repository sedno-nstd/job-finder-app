"use client";
import { useMemo } from "react";
import { EmployerVacancyCard } from "./EmployerVacancyCard";
import clsx from "clsx";
import { EmployerVacancy } from "@/src/types/employer";

interface Props {
  vacancies: EmployerVacancy[];
  className?: string;
  showMore?: () => void;
  hasMore?: boolean;
}

export function EmployerVacancyList({
  vacancies,
  className,
  showMore,
  hasMore,
}: Props) {
  const renderedList = useMemo(() => {
    return vacancies.map((v) => (
      <EmployerVacancyCard
        VacancyClasses="w-full"
        key={v.id}
        vacancy={v}
        views={v.views}
        applications={v.application?.length || 0}
        expiresAt={v.expiresAt}
      />
    ));
  }, [vacancies]);

  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      {vacancies.length > 0 ? (
        <div className="flex flex-col justify-center items-center">
          {renderedList}
          {showMore && hasMore && (
            <button
              onClick={showMore}
              className="px-6 mt-5 py-2 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-200 active:scale-95 cursor-pointer shadow-sm"
            >
              Show more
            </button>
          )}
        </div>
      ) : (
        <div className="p-10 text-center border-2 border-dashed rounded-xl">
          No vacancies found
        </div>
      )}
    </div>
  );
}
