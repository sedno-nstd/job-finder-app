import { BriefcaseBusiness } from "lucide-react";

export function EmployerRegistrationBanner() {
  return (
    <div className="p-4 flex flex-col sm:flex-row items-center sm:items-start mb-6 bg-[#e9f3fe] rounded-xl border border-blue-100">
      <div className="flex-shrink-0 mb-3 sm:mb-0 sm:mr-4">
        <BriefcaseBusiness
          size={24}
          strokeWidth={2}
          className="text-blue-600"
        />
      </div>

      <span className="text-sm sm:text-base font-medium text-gray-800 leading-snug text-center sm:text-left">
        This page is for employers. If you are looking for a job —{" "}
        <a
          href="/registration"
          className="text-blue-600 hover:underline font-semibold transition-all block sm:inline-block mt-2 sm:mt-0"
        >
          go to applicant page
        </a>
      </span>
    </div>
  );
}
