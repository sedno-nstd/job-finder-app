import { FilterButtons } from "../FilterButtons";
import { FilterModal } from "../FiltersSidebar/FiltersModal";
import { VacancySearch } from "../SearchControls";
import { VacancyCount } from "../VacancyCount";

interface HeaderProps {
  getLocation: () => void;
}

export function SearchHeader({ getLocation }: HeaderProps) {
  return (
    <div className="w-full">
      <VacancyCount className="flex flex-col mb-4" />
      <VacancySearch />
      <FilterButtons />
      <FilterModal getLocation={getLocation} />
    </div>
  );
}
