"use client";
import { VacancyCard } from "./VacancyCard";
import { useAuthVacancy } from "@/src/store/useFavorites";
import { Vacancy } from "@/src/config/types";
import { useEffect, useState } from "react";

interface VacanciesProps {
  vacancies: Vacancy[];
  total: number;
  visibleCount: number;
  setVisibleCount: (count: number) => void;
}

export function VacancyList({
  vacancies,
  total,
  visibleCount,
  setVisibleCount,
}: VacanciesProps) {
  const { tooggleFavorites, isFavorite } = useAuthVacancy();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [setMounted]);

  if (!mounted) {
    return (
      <div className="flex flex-col w-full gap-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[200px] w-full bg-gray-100 animate-pulse rounded-2xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {vacancies.map((v) => (
        <VacancyCard
          VacancyClasses="max-w-[640px]"
          key={v.id}
          vacancy={v}
          isFavorite={isFavorite(v.id)}
          toggleFavorites={tooggleFavorites}
          DescriptionClasses="max-w-[600px]"
        />
      ))}

      {visibleCount < total && (
        <button
          className="mt-6 self-center rounded-full bg-gray-200 hover:bg-gray-300 transition-all px-8 py-2 text-sm font-semibold"
          onClick={() => setVisibleCount(visibleCount + 5)}
        >
          Show more
        </button>
      )}
    </div>
  );
}
