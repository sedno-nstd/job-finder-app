import { memo } from "react";
import { Vacancy } from "../config/types";
import { Heart } from "lucide-react";

function VacancyCardComponent({ vacancy }: { vacancy: Vacancy }) {
  return (
    <div className="p-4 mt-4 w-full max-w-md rounded-2xl flex flex-col bg-white shadow">
      <div className="flex flex-row justify-between">
        <span className="text-[#0b64d9] text-2xl font-semibold">
          {vacancy.title} ({vacancy.level})
        </span>
        <span className="group hover:bg-[#6380a61A] p-2 rounded-lg cursor-pointer transition-colors duration-200 flex items-center justify-center">
          <Heart
            strokeWidth={2.5}
            size={22}
            className="text-[#6380a6] group-hover:text-black/80 transition-colors duration-200"
          />
        </span>
      </div>

      <span className="text-xl font-medium">
        {vacancy.negotiable
          ? "negotiable"
          : `${vacancy.salaryFrom}-${vacancy.salaryTo}`}
      </span>
      <span className="mt-2 text-sm">{vacancy.jobLocation}</span>
      <span className="mt-2 font-medium">{vacancy.company}</span>
      <span className="mt-2 text-gray-500">
        Опубликовано: {new Date(vacancy.postedAt).toLocaleDateString()}
      </span>
      {vacancy.city && (
        <span className="text-gray-500">Город: {vacancy.city}</span>
      )}
    </div>
  );
}

export const VacancyCard = memo(VacancyCardComponent);
