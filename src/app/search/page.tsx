"use client";
import { useState } from "react";
import { Sidebar } from "@/src/components/SideBar/SideBar";
import { VacancyList } from "@/src/components/vacancy/list/VacancyList";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { useFilterStore } from "@/src/store/useFilterStore";
import { useVacancies } from "@src/domain/vacancy/hooks/useVacancies";
import { SearchFilters } from "@src/config/types";
import { SearchHeader } from "@/src/components/search/SearchControls/SearchHeader";
import { useSearchStore } from "@src/store/useSearchStore";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [showSideBar, setShowSideBar] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const { minSalary, selectedPeriod } = useFilterStore();
  const { searchQuery, applySearch, finalSearch } = useSearchStore();
  const [filters, setFilters] = useState<SearchFilters>({
    search: "",
    location: "any",
    geo: "all",
    postingDate: "any",
    salaryPeriod: "month",
    stack: [] as string[],
    level: "any",
  });

  const { location: userCoords, getLocation } = useUserLocation();
  const { visible: visibleVacancies, total } = useVacancies(
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
    <div className="flex w-100% min-h-screen font-sans justify-center bg-[#eff2f6]">
      <div className="flex flex-row">
        <div className="w-[244px]">
          <Sidebar />
        </div>
        <div className="pt-6 max-w-[964px]">
          <SearchHeader
            filters={filters}
            getLocation={getLocation}
            setFilters={setFilters}
            setShowSidebar={setShowSideBar}
            showSidebar={showSideBar}
          />
          <VacancyList
            setVisibleCount={setVisibleCount}
            total={total}
            vacancies={visibleVacancies}
            visibleCount={visibleCount}
          />
        </div>
      </div>
    </div>
  );
}
