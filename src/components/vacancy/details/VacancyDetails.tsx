import { VacancyDetailedHeader } from "@/src/components/vacancy/details/components/VacancyDetailedHeader";
import { Respond } from "@/src/components/vacancy/details/components/RespondButton";
import { getJobLocationStyles } from "@/src/domain/vacancy/utils/jobLocationTheme";
import clsx from "clsx";
import { MapPin } from "lucide-react";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/config/auth";
import { EmployerVacancy } from "@/src/types/employer";
import { VacancyApplicants } from "./components/VacancyApplicants";

interface Vacancy {
  vacancy: EmployerVacancy;
}

export default async function VacancyDetails({ vacancy }: Vacancy) {
  const jobStyles = getJobLocationStyles(vacancy.employmentType);
  const session = await getServerSession(authConfig);
  const isOwner = session?.user?.id === vacancy.employerId;

  return (
    <div className="flex flex-col bg-white rounded-lg w-full border border-slate-200">
      <div className="px-6 py-4 relative border-b-[1px] border-[#6380a626]">
        <div className="flex flex-row items-center justify-between mb-3">
          <div className="flex flex-row items-center gap-5">
            <h1 className="text-2xl font-medium text-[#2d3540]">
              {vacancy.title}
            </h1>
            <VacancyDetailedHeader vacancy={vacancy} isOwner={isOwner} />
          </div>
        </div>

        <div className="flex items-baseline gap-2 mt-2">
          {vacancy.negotiable || (!vacancy.salaryFrom && !vacancy.salaryTo) ? (
            <span className="text-lg font-medium text-[#2d3540]">
              Salary Negotiable
            </span>
          ) : (
            <div className="flex items-center gap-1 text-gray-500 font-medium mb-4">
              <span className="text-blue-600">
                {vacancy.currency === "USD" ? "$" : "UAH"}
              </span>
              <span className="text-sm">
                {vacancy.salaryPeriod === "hour" ? "hr" : "mo"}
              </span>
            </div>
          )}
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
            <span className="font-medium">
              {vacancy.city}, {vacancy.country}
            </span>
          </div>

          <div className="flex items-center mb-3">
            <div
              className={clsx(
                "px-4 py-1 rounded-full text-xs font-bold border",
                jobStyles.container,
              )}
            >
              <span className="uppercase tracking-wider">
                {vacancy.employmentType}
              </span>
            </div>
          </div>

          {!isOwner ? (
            <Respond vacancyId={vacancy.id} />
          ) : (
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg">
              <p className="text-blue-700 text-sm font-medium">
                You are the author of this vacancy.
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed">{vacancy.description}</p>
        </div>

        {isOwner && vacancy.application && (
          <VacancyApplicants applications={vacancy.application} />
        )}
      </div>
    </div>
  );
}
