import { memo } from "react";
import { Vacancy } from "@/src/config/types";
import { Clock, MapPin } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

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
    <Link href={`/vacancies/${vacancy.id}`} className="block mt-4 w-fit">
      <div
        className={clsx(
          "p-4 w-full rounded-2xl flex flex-col bg-white shadow",
          VacancyClasses,
        )}
      >
        <div className="flex flex-row justify-between">
          <span className="text-[#0b64d9] text-2xl font-semibold">
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

        <div className="w-full border-t border-gray-300 flex flex-row">
          <div className="flex flex-col">{`Views: ${views}`}</div>{" "}
          <div className="flex flex-col">{`Applications: ${applications}`}</div>{" "}
          <div className="flex flex-col">{`The days left: ${expiresAt.toLocaleDateString()}`}</div>{" "}
        </div>
      </div>
    </Link>
  );
}

export const EmployerVacancyCard = memo(EmployerVacancyCardComponents);
