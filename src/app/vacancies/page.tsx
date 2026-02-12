"use client";
import { useState } from "react";
import { VacancyList } from "@/src/components/vacancy/list/VacancyList";
import { useVacancies } from "@/src/utils/useVacancies";
import { useSearchStore } from "@/src/store/useSearchStore";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { SearchHeader } from "@/src/components/search/SearchControls/SearchHeader";
import { vacancies } from "@/src/domain/vacancy/types";

export default function VacanciesPage() {
  const [visibleCount, setVisibleCount] = useState(5);
  const { location: userCoords, getLocation } = useUserLocation();
  const { resetFilters } = useSearchStore();

  const { visible, total } = useVacancies(visibleCount, userCoords, 50);

  return (
    <>
      <SearchHeader getLocation={getLocation} />
      <div className="pt-3">
        <VacancyList
          onReset={resetFilters}
          safetyData={vacancies}
          vacancies={visible}
          total={total}
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
        />
      </div>
    </>
  );
}
