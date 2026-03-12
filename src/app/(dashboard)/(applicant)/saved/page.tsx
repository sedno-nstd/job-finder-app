export const dynamic = "force-dynamic";
("use client");
import { VacancyList } from "@/src/components/vacancy/list/VacancyList";
import { useAuthVacancy } from "@/src/store/useFavorites";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { favoriteVacancies } = useAuthVacancy();
  const isEmpty = favoriteVacancies.length === 0;
  const router = useRouter();

  return (
    <main className="w-full h-full bg-[#eff2f6] flex flex-col items-center pt-20 pb-10 px-4">
      {isEmpty ? (
        <div className="max-w-md w-full bg-white rounded-3xl p-10 shadow-sm flex flex-col items-center text-center gap-6">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
            <Heart size={40} fill="currentColor" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-[#2D3540]">
              You don't have any saved jobs yet.
            </h1>
            <p className="text-[#596C86]">
              Save interesting vacancies to return to them later.
            </p>
          </div>

          <button
            className="w-full sm:w-auto cursor-pointer rounded-xl py-3 px-8 text-blue-600 font-medium border border-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-300"
            onClick={() => router.push("/vacancies")}
          >
            Go to search
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl flex flex-col justify-start">
          <span className="text-3xl text-[#2d3540] font-medium mb-1">
            Saved
          </span>
          <span className="text-[#5a6f87] text-lg mb-6">
            {favoriteVacancies.length > 1
              ? `${favoriteVacancies.length} saved vacancies`
              : `${favoriteVacancies.length} saved vacancy`}
          </span>

          <div>
            <VacancyList
              safetyData={favoriteVacancies}
              vacancies={favoriteVacancies}
              total={favoriteVacancies.length}
              visibleCount={favoriteVacancies.length}
              setVisibleCount={() => {}}
            />
          </div>
        </div>
      )}
    </main>
  );
}
