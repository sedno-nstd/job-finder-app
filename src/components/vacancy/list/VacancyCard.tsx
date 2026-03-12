import { memo } from "react";
import { Vacancy } from "@/src/config/types";
import { Heart, Clock, MapPin } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

interface VacancyProps {
  vacancy: Vacancy;
  toggleFavorites: (vacancy: Vacancy) => void;
  isFavorite: boolean;
  DescriptionClasses?: string;
  VacancyClasses?: string;
}

function VacancyCardComponent({
  vacancy,
  toggleFavorites,
  isFavorite,
  DescriptionClasses,
  VacancyClasses,
}: VacancyProps) {
  return (
    <Link href={`/vacancies/${vacancy.id}`} className="block mt-4 w-full">
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
          <span
            className="group hover:bg-[#6380a61A] p-2 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorites(vacancy);
            }}
          >
            <Heart
              strokeWidth={2.5}
              fill={isFavorite ? "#ef4444" : "none"}
              className={`${
                isFavorite ? "text-red-500" : "text-[#6380a6]"
              } group-hover:text-black/80 transition-colors duration-200`}
            />
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
      </div>
    </Link>
  );
}

export const VacancyCard = memo(VacancyCardComponent);
