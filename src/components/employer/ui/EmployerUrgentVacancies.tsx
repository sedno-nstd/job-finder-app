import { EmployerVacancy } from "@/src/types/employer";
import clsx from "clsx";

interface Props {
  data: EmployerVacancy;
  className?: string;
}

export function EmployerUrgentVacancy({ data, className }: Props) {
  const expiryDate = new Date(data.expiresAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });

  return (
    <div
      className={clsx(
        "w-full p-4 cursor-pointer  hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-none",
        className,
      )}
    >
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-slate-900 leading-none">
            {data.title}
          </span>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <span className="text-slate-700">
              {data.negotiable
                ? "Negotiable"
                : `${data.salaryFrom?.toLocaleString()} — ${data.salaryTo?.toLocaleString()} ${data.currency}`}
            </span>
            <span className="text-slate-300">/</span>
            <span className="uppercase tracking-wider text-[10px]">
              {data.employmentType}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
              Views
            </span>
            <span className="text-sm font-semibold text-slate-700">
              {data.views}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
              Apps
            </span>
            <span className="text-sm font-semibold text-blue-600">
              {data.application.length}
            </span>
          </div>
          <div className="flex flex-col items-end min-w-[45px]">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
              Ends
            </span>
            <span className="text-[11px] font-bold text-slate-700">
              {expiryDate}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
