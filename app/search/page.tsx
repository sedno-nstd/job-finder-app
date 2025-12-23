import { useState } from "react";
import { Sidebar } from "@/src/components/layout/SideBar";
import { VacancyList } from "@/src/components/vacancy/VacancyList";
import { useUserLocation } from "@/src/hooks/useUserLocation";
import { useFilterStore } from "@/src/store/useFilterStore";
import { useVacancies } from "./domain/vacancy/hooks/useVacancies";
import { SearchFilters } from "./config/types";
import { SearchHeader } from "@/src/components/search/SearchHeader/SearchHeader";
import { useSearchStore } from "../../src/store/useSearchStore";

export function SearchPage() {
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
        <Sidebar />
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
