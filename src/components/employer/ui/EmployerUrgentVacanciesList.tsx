import { EmployerUrgentVacancy } from "./EmployerUrgentVacancies";
import clsx from "clsx";
import { EmployerVacancy } from "@/src/types/employer";
import { useState } from "react";

interface Props {
  data: EmployerVacancy[];
  className?: string;
}

export function EmployerUrgentVacanciesList({ data, className }: Props) {
  const [count, setCount] = useState(5);
  const handleGetMore = () => {
    setCount((prev) => prev + 5);
  };
  return (
    <div
      className={clsx(
        "bg-white p-6 border border-slate-200 shadow-sm",
        className,
      )}
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-800 text-lg">Urgent</h3>
      </div>
      <div className="flex flex-col gap-3">
        {data.slice(0, count).map((vacancy) => (
          <EmployerUrgentVacancy key={vacancy.id} data={vacancy} />
        ))}
        <button
          className="w-full cursor-pointer border border-gray-300 rounded-xl py-3 text-xs font-bold text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-colors uppercase tracking-widest border-t "
          onClick={() => handleGetMore()}
        >
          Show more
        </button>
      </div>
    </div>
  );
}
