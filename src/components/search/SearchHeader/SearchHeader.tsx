import { FilterButtons } from "../FilterButtons";
import { FilterModal } from "../FiltersModal";
import { SalarySlider } from "../SalarySlider";
import { SearchControll } from "../SearchControls";

interface HeaderProps {
  setShowSidebar: any;
  getLocation: () => void;
  filters: any;
  setFilters: any;
  showSidebar: boolean;

  // search: string;
  // setSearch: () => string;
}

export function SearchHeader({
  setShowSidebar,
  filters,
  getLocation,
  setFilters,
  showSidebar,
}: HeaderProps) {
  return (
    <div className="w-full">
      <SearchControll />
      <FilterButtons
        showSideBar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <FilterModal
        filters={filters}
        getLocation={getLocation}
        setFilters={setFilters}
        showSidebar={showSidebar}
      />
    </div>
  );
}
