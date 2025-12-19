import { useAuthVacancy } from "../store/useFavorites";
import { Heart } from "lucide-react";

export function Page() {
  const { favoriteVacancies } = useAuthVacancy();
  const isEmpty = favoriteVacancies.length === 0;

  return (
    <main className="w-full min-h-screen bg-gray-100 flex items-center justify-center p-4">
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

          <button className="w-full sm:w-auto rounded-xl py-3 px-8 text-blue-600 font-medium border border-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-300">
            Go to search
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl flex flex-col gap-4"></div>
      )}
    </main>
  );
}
