"use client";
import { useState } from "react";
import { VacancyList } from "@/src/components/vacancy/list/VacancyList";
import { useVacanciesContext } from "../../components/providers/VacanciesContext";
import { useVacancies } from "@/src/domain/vacancy/hooks/useVacancies";
import { useFilterStore } from "@/src/store/useFilterStore";
import { useSearchStore } from "@/src/store/useSearchStore";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { SearchHeader } from "@/src/components/search/SearchHeader/SearchHeader";

export default function VacanciesPage() {
  const { filters, setFilters, setShowSideBar, showSideBar } =
    useVacanciesContext();
  const [visibleCount, setVisibleCount] = useState(5);

  const { minSalary, selectedPeriod } = useFilterStore();
  const { applySearch, finalSearch } = useSearchStore();
  const { location: userCoords, getLocation } = useUserLocation();

  const { visible, total } = useVacancies(
    filters,
    visibleCount,
    userCoords,
    50,
    minSalary,
    selectedPeriod,
    finalSearch,
    applySearch
  );

  return (
    <>
      <SearchHeader
        filters={filters}
        setFilters={setFilters}
        setShowSidebar={setShowSideBar}
        showSidebar={showSideBar}
        getLocation={getLocation}
      />
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
