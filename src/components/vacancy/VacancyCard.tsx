import { memo } from "react";
import { Vacancy } from "@/app/search/config/types";
import { Heart, Clock, MapPin } from "lucide-react";
import clsx from "clsx";

interface VacancyProps {
  vacancy: Vacancy;
  toggleFavorites: (vacancy: Vacancy) => void;
  isFavorite: boolean;
  DescriptionClasses?: string;
  VacancyClasses?: string;
}

const RANDOM_DESCRIPTIONS = [
  "We are looking for a passionate developer to join our core team. You will be responsible for building scalable web applications and collaborating with cross-functional teams.",
  "Join our fast-growing startup and help us revolutionize the industry. In this role, you will work on cutting-edge technologies and contribute to architectural decisions.",
  "An exciting opportunity for a detail-oriented engineer. You will focus on performance optimization, maintaining clean codebases, and implementing new features.",
];

function VacancyCardComponent({
  vacancy,
  toggleFavorites,
  isFavorite,
  DescriptionClasses,
  VacancyClasses,
}: VacancyProps) {
  const descriptionIndex = Number(vacancy.id) % RANDOM_DESCRIPTIONS.length;
  const description = RANDOM_DESCRIPTIONS[descriptionIndex];

  return (
    <div
      className={clsx(
        "p-4 mt-4 w-full rounded-2xl flex flex-col bg-white shadow",
        VacancyClasses
      )}
    >
      <div className="flex flex-row justify-between">
        <span className="text-[#0b64d9] text-2xl font-semibold">
          {vacancy.title} ({vacancy.level})
        </span>
        <span
          className="group hover:bg-[#6380a61A] p-2 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center"
          onClick={() => toggleFavorites(vacancy)}
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

      <span className="mt-2 text-base">{vacancy.jobLocation}</span>
      <p className={clsx("", DescriptionClasses)}>{description}</p>
      <span className="mt-2 font-medium">
        <span className="text-[13px]">Company:</span> {vacancy.company}
      </span>
      <span className="mt-2 text-gray-500 text-[17px] flex flex-row items-center gap-2">
        <Clock size={16} /> {new Date(vacancy.postedAt).toLocaleDateString()}
      </span>
      {vacancy.city && (
        <span className="text-gray-500 text-[17px] flex flex-row items-center gap-2">
          <MapPin size={16} /> {vacancy.city}
        </span>
      )}
    </div>
  );
}

export const VacancyCard = memo(VacancyCardComponent);
