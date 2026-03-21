"use client";
import { getRespondVacancies } from "@/src/actions/applicant/getRespondVacancies";
import { Vacancy } from "@/src/config/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { VacancyList } from "../vacancy/list/VacancyList";
import { Search } from "lucide-react";
import { FullPageLoader } from "../ui/base/Loader";
import { Input } from "../ui/search/JobSearchForm";
import { SortSelector } from "./parts/SortSelector";
import { useRespondeData } from "./hooks/useRespondeData";

export function Responde() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();

  const {
    filteredVacancies,
    searchCompany,
    searchTitle,
    setSearchCompany,
    setSearchTitle,
    setSortBy,
    sortType,
  } = useRespondeData(vacancies as any);

  useEffect(() => {
    if (!session?.user?.id) return;

    const fetchVacancies = async () => {
      try {
        setLoading(true);
        const data = await getRespondVacancies();
        setVacancies(data as unknown as Vacancy[]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, [session?.user?.id]);

  if (loading) return <FullPageLoader message="Loading your applications..." />;

  return (
    <div className="flex flex-col mb-10 justify-center items-center">
      <div className="w-full flex flex-row items-center gap-4 mb-6">
        <Input
          variant="default"
          icon2={Search}
          icon2ClassName="hover:bg-gray-300 duration-200 text-gray-500"
          className="border text-main w-[350px] h-[48px]"
          placeholder="Search job title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
        <Input
          variant="default"
          icon2={Search}
          icon2ClassName="hover:bg-gray-300 duration-200 text-gray-500"
          className="border w-[350px] text-main h-[48px]"
          placeholder="Search company name"
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
        />
        <SortSelector sortType={sortType} setSortBy={setSortBy} />
      </div>
      <VacancyList
        visibleCount={filteredVacancies.length}
        total={filteredVacancies.length}
        vacancies={filteredVacancies as unknown as Vacancy[]}
      />
    </div>
  );
}
