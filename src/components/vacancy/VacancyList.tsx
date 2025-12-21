import { VacancyCard } from "./VacancyCard";
import { useAuthVacancy } from "@/app/store/useFavorites";
import { Vacancy } from "@/app/search/config/types";

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

  return (
    <div className="flex flex-col w-full">
      {vacancies.map((v) => (
        <VacancyCard
          VacancyClasses="max-w-[640px]"
          key={v.id}
          vacancy={v}
          isFavorite={isFavorite(v.id)}
          toggleFavorites={tooggleFavorites}
          DescriptionClasses="line-clamp-2 max-w-[350px]"
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
