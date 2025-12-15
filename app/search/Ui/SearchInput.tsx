"use client";
import { useState, useEffect } from "react";
import { useUserLocation } from "@/app/hooks/useUserLocation";
import { useVacancies } from "../domain/vacancy/useVacancies";
import { SearchBar } from "./SearchBar";
import { VacancyCard } from "./VacancyCard";
import { FiltersSidebar } from "./FiltersSidebar";
import {
  JOB_LOCATION_OPTIONS,
  POSTING_DATE_OPTIONS,
  JOB_EXPIERENCE,
} from "../config/categories";
import clsx from "clsx";

export function SearchInput() {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [showSidebar, setShowSidebar] = useState(false);
  const [filters, setFilters] = useState({
    location: string[],
    geo: "any",
    postingDate: "any",
    salaryPeriod: "month",
    stack: [] as string[],
    level: "any",
  });

  const { location, getLocation } = useUserLocation();
  const { visible: visibleVacancies, total } = useVacancies(
    search,
    visibleCount,
    filters.postingDate,
    location,
    50,
    filters.level,
    filters.location,
    filters.geo,
  );

  useEffect(() => {
    if (filters.location === "near") {
      getLocation();
    }
  }, [filters.location]);

  return (
    <div
      className={clsx(
        "w-full flex flex-col items-center relative p-4",
        showSidebar ? "shadow-2xl" : ""
      )}
    >
      <SearchBar search={search} setSearch={setSearch} />

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-white py-2 px-5 rounded-2xl hover:text-blue-600 cursor-pointer hover:border hover:border-blue-600"
        >
          Date of Publish
        </button>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-white py-2 px-5 rounded-2xl hover:text-blue-600 cursor-pointer hover:border hover:border-blue-600"
        >
          Type of employment
        </button>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-white py-2 px-5 rounded-2xl hover:text-blue-600 cursor-pointer hover:border hover:border-blue-600"
        >
          Job expierence
        </button>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-white py-2 px-5 rounded-2xl hover:text-blue-600 cursor-pointer hover:border hover:border-blue-600"
        >
          Location
        </button>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-white py-2 px-5 rounded-2xl hover:text-blue-600 cursor-pointer hover:border hover:border-blue-600"
        >
          Salary
        </button>
        {showSidebar && (
          <div className="absolute top-0 right-0 flex flex-col">
            <FiltersSidebar
              title="Job Location"
              options={JOB_LOCATION_OPTIONS}
              selectedValue={filters.location}
              setSelectedValue={(value) =>
                setFilters((prev) => ({ ...prev, location: value }))
              }
              handleLocationRequest={getLocation}
            />

            <FiltersSidebar
              title="Date of Publish"
              options={POSTING_DATE_OPTIONS}
              selectedValue={filters.postingDate}
              setSelectedValue={(value) =>
                setFilters((prev) => ({ ...prev, postingDate: value }))
              }
            />

            <FiltersSidebar
              title="Job expierence"
              options={JOB_EXPIERENCE}
              selectedValue={filters.level}
              setSelectedValue={(value) =>
                setFilters((prev) => ({ ...prev, level: value }))
              }
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center mt-4">
        {visibleVacancies.map((v) => (
          <VacancyCard key={v.id} vacancy={v} />
        ))}
        {visibleCount < total && (
          <button
            className="mt-4 rounded-full bg-gray-400 p-2"
            onClick={() => setVisibleCount(visibleCount + 5)}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
