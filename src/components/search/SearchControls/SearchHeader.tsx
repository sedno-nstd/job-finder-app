import { useState } from "react";
import { FilterButtons } from "../FilterButtons";
import { FilterModal } from "../FiltersSidebar/FiltersModal";
import { VacancySearch } from "../SearchControls";
import { VacancyCount } from "../VacancyCount";

interface HeaderProps {
  getLocation: () => void;
}

export function SearchHeader({ getLocation }: HeaderProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full">
      <VacancyCount className="flex flex-col mb-4" />
      <VacancySearch openModal={open} setisOpen={setOpen} />
      <FilterButtons
        openModal={open}
        setisOpen={() => setOpen((prev) => !prev)}
      />
      <FilterModal getLocation={getLocation} />
    </div>
  );
}
