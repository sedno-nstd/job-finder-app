"use client";
import { OnboardingData } from "@/src/types/user";
import { useEffect, useState } from "react";
import { VacancyList } from "../vacancy/list/VacancyList";
import { useRecommendation } from "@/src/hooks/vacancy/useRecomendation";
import { useRecommendationStore } from "@/src/store/useRecomandeStorage";
import { vacancies } from "@/src/domain/vacancy/types";
import { getFullUserData } from "@/src/actions/applicant/getFullUserData";
import { useRouter } from "next/navigation";
import { GetAllVacancies } from "@/src/actions/vacancies/GetAllVacancies";
import { Vacancy } from "@/src/config/types";

export function Recomande() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<OnboardingData | null>(null);
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const { vacancies: storeVacancies } = useRecommendationStore();
  const [visibleCount, setVisibleCount] = useState(5);
  const router = useRouter();

  const recommended = useRecommendation({
    user: userData || null,
    vacancy: vacancies,
  });

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const res = await getFullUserData();
      const vacancyRes = await GetAllVacancies();

      try {
        if (res.success && res.data) {
          setUserData(res.data.onBoarding);
          setVacancies(vacancyRes);
          setLoading(false);
        } else {
          console.log(res.error);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [setLoading]);

  const addVisibleVacancies = () => {
    setVisibleCount((prev) => prev + 5);
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-400">
        Loading recommendations...
      </div>
    );
  }

  if (recommended.length === 0) {
    return (
      <div className="flex w-full max-w-[500px] flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
        <h3 className="text-xl font-bold text-gray-800">No vacancies yet</h3>

        <p className="text-gray-500 mb-6">
          Try adjusting your filters or search query
        </p>

        <button
          className="w-full sm:w-auto cursor-pointer rounded-xl py-3 px-8 text-blue-600 font-medium border border-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-300"
          onClick={() => router.push("/vacancies")}
        >
          Go to search
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full text-main mb-10">
      <h1 className="text-xl mb-2">Recomended vacancies</h1>
      <span className="text-[#5a6f87] mb-6">
        We are analize your profile and find vacancies, such can be interesting
        for you
      </span>
      <VacancyList
        total={storeVacancies.length}
        vacancies={recommended}
        visibleCount={visibleCount}
        setVisibleCount={addVisibleVacancies}
      />
    </div>
  );
}
