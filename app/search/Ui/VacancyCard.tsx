import { memo } from "react";
import { Vacancy } from "../domain/vacancy/types";

function VacancyCardComponent({ vacancy }: { vacancy: Vacancy }) {
  return (
    <div className="p-4 mt-4 w-full max-w-md rounded-2xl flex flex-col bg-white shadow">
      <span className="text-[#0b64d9] text-2xl font-semibold">
        {vacancy.title} ({vacancy.level})
      </span>
      <span className="text-xl font-medium">
        {vacancy.negotiable
          ? "negotiable"
          : `${vacancy.salaryFrom}-${vacancy.salaryTo}`}
      </span>
      <span className="mt-2 text-sm">
        {vacancy.jobLocation ? "Удаленная" : "Оффлайн"}
      </span>
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
