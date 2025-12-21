// "use client";
// import { useState, useEffect } from "react";
// import { useUserLocation } from "@/app/hooks/useUserLocation";
// import { useVacancies } from "../domain/vacancy/useVacancies";
// import { SearchBar } from "./SearchBar";
// import { VacancyCard } from "./VacancyCard";
// import { FiltersSidebar } from "./FiltersSidebar";
// import { SearchFilters } from "../config/types";
// import {
//   FILTER_JOB_LOCATIONS,
//   FILTER_JOB_EXPERIENCE,
//   FILTER_POSTING_DATES,
// } from "../config/searchOptions";
// import { SalarySlider } from "./SalaryRange";
// import { useFilterStore } from "@/app/store/useFilterStore";
// import { useAuthVacancy } from "@/app/store/useFavorites";
// import { OptionsJobParams } from "../config/optionsJobParams";
// import { useSearchStore } from "@/app/store/useSearchStore";

// export function SearchInput() {
//   const [search, setSearch] = useState("");
//   const [visibleCount, setVisibleCount] = useState(5);
//   const [showSidebar, setShowSidebar] = useState(false);
//   const { minSalary, selectedPeriod } = useFilterStore();
//   const { searchQuery } = useSearchStore();
//   const { tooggleFavorites, isFavorite } = useAuthVacancy();
//   const [filters, setFilters] = useState<SearchFilters>({
//     search: "",
//     location: "any",
//     geo: "all",
//     postingDate: "any",
//     salaryPeriod: "month",
//     stack: [] as string[],
//     level: "any",
//   });

//   const { location: userCoords, getLocation } = useUserLocation();
//   const { visible: visibleVacancies, total } = useVacancies(
//     { ...filters, search },
//     visibleCount,
//     userCoords,
//     50,
//     minSalary,
//     selectedPeriod,
//     searchQuery
//   );
//   useEffect(() => {
//     if (filters.location === "near") {
//       getLocation();
//     }
//     if (showSidebar) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//     setSearch(search);
//     document.body.style.overflow = "auto";
//   }, [filters.location, search]);

//   return (
//     <div className="flex flex-col p-4">
//       <SearchBar search={search} setSearch={setSearch} />

//       <div className="flex gap-2 mt-4">
//         <OptionsJobParams
//           setShowSidebar={setShowSidebar}
//           showSideBar={showSidebar}
//         />
//         {showSidebar && (
//           <div className="absolute top-0 right-0 flex flex-col bg-white">
//             <h1 className="text-2xl p-2">Filters</h1>
//             <FiltersSidebar
//               title="Job Location"
//               options={FILTER_JOB_LOCATIONS}
//               selectedValue={filters.location}
//               setSelectedValue={(value) =>
//                 setFilters((prev) => ({ ...prev, location: value as any }))
//               }
//               handleLocationRequest={getLocation}
//             />

//             <FiltersSidebar
//               title="Date of Publish"
//               options={FILTER_POSTING_DATES}
//               selectedValue={filters.postingDate}
//               setSelectedValue={(value) =>
//                 setFilters((prev) => ({ ...prev, postingDate: value as any }))
//               }
//             />

//             <FiltersSidebar
//               title="Job expierence"
//               options={FILTER_JOB_EXPERIENCE}
//               selectedValue={filters.level}
//               setSelectedValue={(value) =>
//                 setFilters((prev) => ({ ...prev, level: value as any }))
//               }
//             />
//             <div className="max-h-[50px]">{<SalarySlider />}</div>
//           </div>
//         )}
//       </div>

//       <div className=" mt-4">
//         {visibleVacancies.map((v) => (
//           <VacancyCard
//             key={v.id}
//             vacancy={v}
//             isFavorite={isFavorite(v.id)}
//             toggleFavorites={tooggleFavorites}
//           />
//         ))}
//         {visibleCount < total && (
//           <button
//             className="mt-4 rounded-full bg-gray-400 p-2"
//             onClick={() => setVisibleCount(visibleCount + 5)}
//           >
//             Show more
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
