"use client";
import { useMemo } from "react";
import { EmployerVacancyCard } from "./EmployerVacancyCard";

export function EmployerVacancyList({ vacancies }: { vacancies: any[] }) {
  const renderedList = useMemo(() => {
    return vacancies.map((v) => (
      <EmployerVacancyCard
        key={v.id}
        vacancy={v}
        views="0"
        applications={v.application?.length || 0}
        expiresAt={v.expiresAt}
      />
    ));
  }, [vacancies]);

  return (
    <div className="w-full flex flex-col gap-4">
      {vacancies.length > 0 ? (
        renderedList
      ) : (
        <div className="p-10 text-center border-2 border-dashed rounded-xl">
          No vacancies found
        </div>
      )}
    </div>
  );
}
