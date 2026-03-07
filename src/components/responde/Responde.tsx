"use client";
import { getRespondVacancies } from "@/src/actions/applicant/getRespondVacancies";
import { Vacancy } from "@/src/config/types";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { VacancyList } from "../vacancy/list/VacancyList";
import { Flame } from "lucide-react";
import { useRouter } from "next/navigation";

export function Responde() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  const user = data?.user;
  useEffect(() => {
    const handleUpload = async () => {
      if (!user?.id) throw new Error("User does not exist");

      try {
        setLoading(true);
        const data = await getRespondVacancies(user?.id);

        setVacancies(data || []);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    handleUpload();
  }, [user?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (vacancies.length === 0) {
    return (
      <div className="max-w-[448px] w-full flex-col bg-white p-6 flex items-center justify-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#6380a61a]/70">
          <Flame size={40} className="text-[#5a6f87]" />
        </div>
        <span className="text-2xl leading-8 font-bold mt-6 mb-2">
          No responses yet
        </span>
        <div className="flex justify-center text-center mb-6">
          <p className="max-w-[320px] text-base leading-6">
            Start your career journey by responding to interesting vacancies
          </p>
        </div>
        <button
          onClick={() => router.push("/vacancies")}
          className="w-full rounded-lg border border-[#0B64D9]/30 text-[#0b64d9] hover:text-white cursor-pointer duration-200 transition-colors hover:bg-blue-600 h-[48px] font-bold"
        >
          Go to search
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-10">
      <span className="text-xl font-semibold">
        {vacancies.length} Respondes
      </span>
      <VacancyList
        visibleCount={vacancies.length}
        total={vacancies.length}
        vacancies={vacancies}
      />
    </div>
  );
}
