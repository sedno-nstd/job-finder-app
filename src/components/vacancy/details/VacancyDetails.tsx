import { VacancyDetailedHeader } from "@/src/components/vacancy/details/VacancyDetailedHeader";
import { Respond } from "@/src/components/vacancy/details/RespondButton";
import { getJobLocationStyles } from "@/src/domain/vacancy/utils/jobLocationTheme";
import clsx from "clsx";
import { MapPin, Phone } from "lucide-react";
import { Vacancy } from "@/src/config/types";
import { GetVacancies } from "@/src/actions/getVacancies";

interface VacancyProps {
  vacancy: Vacancy;
}

export default async function VacancyDetails({ vacancy }: VacancyProps) {
  const jobStyles = getJobLocationStyles(vacancy.employmentType);

  return (
    <div className="flex flex-col bg-white rounded-lg w-full">
      <div className="px-6 py-4 relative border-b-[1px] border-[#6380a626]  ">
        <div className="flex flex-row items-center gap-5 mb-3 ">
          <h1 className="text-2xl font-medium text-[#2d3540]">
            {vacancy.title}
          </h1>
          <VacancyDetailedHeader vacancy={vacancy} />
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-2xl font-medium text-[#2d3540] tracking-tight">
            {vacancy.salaryFrom?.toLocaleString()} —{" "}
            {vacancy.salaryTo?.toLocaleString()}
          </span>

          <div className="flex items-center gap-1 text-gray-500 font-medium mb-4">
            <span className="text-blue-600">
              {vacancy.currency === "USD" ? "$" : "UAH"}
            </span>
            <span className="text-sm">
              {vacancy.salaryPeriod === "hour" ? "hr" : "mo"}
            </span>
          </div>
        </div>
        <div>
          <span className="text-blue-600 font-semibold">{vacancy.company}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2 text-[#2d3540]">
            <MapPin size={22} className="text-gray-400" />
            <span className="font-medium ">
              {" "}
              {vacancy.city}, {vacancy.country}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Phone size={22} className="text-gray-400" />
            <button className="text-base font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Show contacts
            </button>
          </div>
          <div className="flex items-center mb-3 ">
            <div
              className={clsx(
                "px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 border",
                jobStyles.container,
              )}
            >
              <span className="uppercase tracking-wider">
                {vacancy.employmentType}
              </span>
            </div>
          </div>
          <Respond vacancyId={vacancy.id} />
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed">{vacancy.description}</p>
        </div>
      </div>
    </div>
  );
}
