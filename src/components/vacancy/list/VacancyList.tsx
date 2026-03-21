"use client";
import { VacancyCard } from "./VacancyCard";
import { Vacancy } from "@/src/config/types";
import { useEffect, useState } from "react";
import {
  AddFavoriteVacancies,
  CheckFavoriteVacancy,
} from "@/src/actions/applicant/favoriteVacancies";

interface VacanciesProps {
  vacancies: Vacancy[];
  total: number;
  visibleCount: number;
  setVisibleCount?: (count: number) => void;
  emptyState?: React.ReactNode;
  safetyData?: any[];
  onReset?: () => void;
  className?: string;
}

export function VacancyList({
  vacancies,
  total,
  visibleCount,
  setVisibleCount,
  emptyState,
  onReset,
  safetyData,
  className,
}: VacanciesProps) {
  const [isFavorite, setIsFavorite] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleFetchFavorites = async () => {
      const res = await CheckFavoriteVacancy();

      if (res.success && res.vacancies) {
        const ids = res.vacancies.map((v: any) => v.id);
        setIsFavorite(ids);
      }
    };

    handleFetchFavorites();
  }, []);

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

  if (safetyData?.length === 0) {
    return <>{emptyState}</>;
  }

  if (vacancies.length === 0) {
    return (
      <div className="flex w-full mt-10 flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
        <h3 className="text-xl font-bold text-gray-800">No vacancies yet</h3>

        <p className="text-gray-500 mb-6">
          Try adjusting your filters or search query
        </p>

        {onReset && (
          <button
            onClick={onReset}
            className="text-blue-600 cursor-pointer duration-200 font-semibold hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[632px]">
      {vacancies.map((v) => (
        <VacancyCard
          VacancyClasses="max-w-[632px]"
          key={v.id}
          vacancy={v}
          isFavorite={isFavorite.includes(v.id)}
          toggleFavorites={async () => {
            const res = await AddFavoriteVacancies(v.id);
            if (res.success) {
              setIsFavorite((prev) =>
                prev.includes(v.id)
                  ? prev.filter((id) => id !== v.id)
                  : [...prev, v.id],
              );
            }
          }}
          DescriptionClasses="max-w-[600px]"
        />
      ))}

      {setVisibleCount && visibleCount < total && (
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
