"use client";
import { deleteVacancy } from "@/src/actions/employer/vacancies/deleteVacancy";
import { ROUTES } from "@/src/config/router";
import { useOutsideClick } from "@/src/hooks/ui/useOutsideClick";
import { Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  vacancyId: string;
}

export function VacancyAdminMenu({ vacancyId }: Props) {
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    const result = await deleteVacancy(vacancyId);
    if (result.success) {
      router.push(ROUTES.EMPLOYER.ROOT);
      router.refresh();
    }
  };

  const useRef = useOutsideClick<HTMLDivElement>(() => setShowMenu(false));

  return (
    <div
      className="absolute right-6 top-6 flex items-center gap-2"
      ref={useRef}
    >
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="p-2 cursor-pointer hover:bg-slate-100 rounded-lg text-slate-400 transition-all active:scale-90"
        >
          <Settings size={22} />
        </button>

        {showMenu && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-xl py-2 z-50 animate-in fade-in zoom-in duration-200">
            {!confirmDelete ? (
              <>
                <button
                  onClick={() => router.push(`/vacancies/${vacancyId}/edit`)}
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Edit Vacancy
                </button>
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete Vacancy
                </button>
              </>
            ) : (
              <div className="px-4 py-2 animate-in slide-in-from-right-2 duration-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Are you sure?
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleDelete}
                    className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Yes, delete
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    No, cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
