"use client";
import { useEffect, useState } from "react";
import { VacancyList } from "@/src/components/vacancy/list/VacancyList";
import { useVacancies } from "@/src/hooks/vacancy/useVacancies";
import { useSearchStore } from "@/src/store/useSearchStore";
import { useUserLocation } from "@/src/hooks/user/useUserLocation";
import { SearchHeader } from "@/src/components/search/SearchControls/SearchHeader";
import { GetAllVacancies } from "@/src/actions/GetAllVacancies";
import { Vacancy } from "@/src/config/types";

export default function VacanciesPage() {
  const [vacancies, setVacansies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(5);
  const { location: userCoords, getLocation } = useUserLocation();
  const { resetFilters } = useSearchStore();

  const { visible, total } = useVacancies(
    vacancies,
    visibleCount,
    userCoords,
    50,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetAllVacancies();
        setVacansies(data);
        setLoading(false);
        if (!data) throw new Error();
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading vacancy page</div>;
  return (
    <>
      <SearchHeader getLocation={getLocation} />
      <div className="pt-3">
        <VacancyList
          onReset={resetFilters}
          safetyData={vacancies}
          vacancies={visible}
          total={total}
          visibleCount={visibleCount}
          setVisibleCount={setVisibleCount}
        />
      </div>
    </>
  );
}
