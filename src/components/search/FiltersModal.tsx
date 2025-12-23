import {
  FILTER_JOB_EXPERIENCE,
  FILTER_JOB_LOCATIONS,
  FILTER_POSTING_DATES,
} from "@/app/search/config/searchOptions";
import { SearchFilters } from "@/app/search/config/types";
import { FiltersSidebar } from "@/src/components/search/FiltersSidebar";
import { SalarySlider } from "./SalarySlider";

interface ModalParams {
  showSidebar: boolean;
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  getLocation: () => void;
}

export function FilterModal({
  showSidebar,
  filters,
  setFilters,
  getLocation,
}: ModalParams) {
  return (
    <div>
      {showSidebar && (
        <div className="absolute top-0 right-0 flex flex-col bg-white">
          <h1 className="text-2xl p-2">Filters</h1>
          <FiltersSidebar
            title="Job Location"
            options={FILTER_JOB_LOCATIONS}
            selectedValue={filters.location}
            setSelectedValue={(value) =>
              setFilters((prev) => ({ ...prev, location: value as any }))
            }
            handleLocationRequest={getLocation}
          />

          <FiltersSidebar
            title="Date of Publish"
            options={FILTER_POSTING_DATES}
            selectedValue={filters.postingDate}
            setSelectedValue={(value) =>
              setFilters((prev) => ({ ...prev, postingDate: value as any }))
            }
          />

          <FiltersSidebar
            title="Job expierence"
            options={FILTER_JOB_EXPERIENCE}
            selectedValue={filters.level}
            setSelectedValue={(value) =>
              setFilters((prev) => ({ ...prev, level: value as any }))
            }
          />
          <div className="max-h-[50px]">{<SalarySlider />}</div>
        </div>
      )}
    </div>
  );
}
