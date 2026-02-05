import {
  FILTER_JOB_EXPERIENCE,
  FILTER_JOB_LOCATIONS,
  FILTER_POSTING_DATES,
} from "@/src/config/searchOptions";
import { FiltersSidebar } from "@/src/components/search/FiltersSidebar/FiltersSidebar";
import { SalarySlider } from "../SalarySlider";
import { useSearchStore } from "@/src/store/useSearchStore";

interface ModalParams {
  getLocation: () => void;
}

export function FilterModal({ getLocation }: ModalParams) {
  const { locationType, postingDate, level, setFilter, showSideBar } =
    useSearchStore();
  return (
    <div>
      {showSideBar && (
        <div className="absolute top-0 right-0 flex flex-col bg-white">
          <h1 className="text-2xl p-2">Filters</h1>
          <FiltersSidebar
            title="Job Location"
            options={FILTER_JOB_LOCATIONS}
            selectedValue={locationType}
            setSelectedValue={(value) => setFilter("locationType", value)}
            handleLocationRequest={getLocation}
          />

          <FiltersSidebar
            title="Date of Publish"
            options={FILTER_POSTING_DATES}
            selectedValue={postingDate}
            setSelectedValue={(value) => setFilter("postingDate", value)}
          />

          <FiltersSidebar
            title="Job expierence"
            options={FILTER_JOB_EXPERIENCE}
            selectedValue={level}
            setSelectedValue={(value) => setFilter("level", value)}
          />
          <div>
            <SalarySlider />
          </div>
        </div>
      )}
    </div>
  );
}
