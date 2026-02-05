import { FilterButtons } from "../FilterButtons";
import { FilterModal } from "../FiltersSidebar/FiltersModal";
import { SearchControll } from "../SearchControls";

interface HeaderProps {
  getLocation: () => void;
}

export function SearchHeader({ getLocation }: HeaderProps) {
  return (
    <div className="w-full">
      <SearchControll
        borderBariant="hero"
        firstInputClasses="w-[436px]"
        secondInputSlasses="w-[436px]"
        buttonClasses="max-h-[40px]"
      />
      <FilterButtons />
      <FilterModal getLocation={getLocation} />
    </div>
  );
}
