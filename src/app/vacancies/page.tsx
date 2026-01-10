"use client";
import { useState } from "react";
import { VacancyList } from "@/src/components/vacancy/list/VacancyList";
import { useVacancies } from "@/src/domain/vacancy/hooks/useVacancies";
import { useSearchStore } from "@/src/store/useSearchStore";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { SearchHeader } from "@/src/components/search/SearchControls/SearchHeader";

export default function VacanciesPage() {
  const [visibleCount, setVisibleCount] = useState(5);
  const { location: userCoords, getLocation } = useUserLocation();

  const { visible, total } = useVacancies(visibleCount, userCoords, 50);

  return (
    <>
      <SearchHeader getLocation={getLocation} />
      <div className="pt-3">
        <VacancyList
          vacancies={visible}
          total={total}
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
        />
      </div>
    </>
  );
}
