import { memo } from "react";
import { Vacancy } from "@/src/config/types";
import { Clock, MapPin } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

interface Data {
  applications: string;
  expiresAt: Date;
  views: string;
}

interface VacancyProps extends Data {
  vacancy: Vacancy;
  DescriptionClasses?: string;
  VacancyClasses?: string;
}

function EmployerVacancyCardComponents({
  vacancy,
  DescriptionClasses,
  VacancyClasses,
  applications,
  expiresAt,
  views,
}: VacancyProps) {
  return (
    <Link
      href={`/vacancies/${vacancy.id}`}
      className={cn("mt-4 block w-full", VacancyClasses)}
    >
      <div className="p-4 rounded-2xl flex flex-col w-full bg-white shadow">
        <div className="flex flex-row justify-between">
          <span className="text-[#0b64d9] text-2xl font-semibold w-full max-w-[406px] text-wrap">
            {vacancy.title} ({vacancy.level})
          </span>
        </div>

        <span className="text-xl font-medium">
          {vacancy.negotiable ? (
            <span className="text-gray-500 italic">Negotiable</span>
          ) : (
            <div className="flex items-baseline gap-1">
              <span>
                {vacancy.salaryFrom?.toLocaleString()} —{" "}
                {vacancy.salaryTo?.toLocaleString()}
              </span>

              <span className="text-[#0b64d9]">
                {vacancy.currency === "USD" ? "$" : "UAH"}
              </span>

              <span className="text-sm text-gray-500 font-normal">
                {vacancy.salaryPeriod === "hour" ? "hr" : "mo"}
              </span>
            </div>
          )}
        </span>

        <span className="mt-2 text-base">{vacancy.employmentType}</span>
        <p className={clsx("", DescriptionClasses)}>{vacancy.description}</p>
        <span className="mt-2 font-medium">
          <span className="text-[13px]">Company:</span> {vacancy.company}
        </span>
        <span className="mt-2 text-gray-500 text-[17px] flex flex-row items-center gap-2">
          <Clock size={16} /> {new Date(vacancy.postedAt).toLocaleDateString()}
        </span>
        {vacancy.city && vacancy.country && (
          <span className="text-gray-500 text-[17px] flex flex-row items-center gap-2">
            <MapPin size={16} />{" "}
            <span>
              {vacancy.city}, {vacancy.country}
            </span>
          </span>
        )}

        <div className="w-full border-t border-gray-100 pt-4 mt-4 flex flex-row justify-between items-center text-sm">
          <div className="flex gap-6">
            <div className="flex flex-col">
              <span className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">
                Views
              </span>
              <span className="text-slate-700 font-semibold text-lg">
                {views}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">
                Applications
              </span>
              <span className="text-blue-600 font-semibold text-lg">
                {applications}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-gray-400 text-[10px] uppercase tracking-wider font-bold">
              Expires
            </span>
            <span className="text-slate-600 font-medium">
              {new Date(expiresAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const EmployerVacancyCard = memo(EmployerVacancyCardComponents);
