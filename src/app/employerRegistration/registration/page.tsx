import { JoobleLogo } from "@/public/images/userHeader/logo";
import { EmployerRegistration } from "@/src/components/employerRegistation/Registration";
import { ROUTES } from "@/src/config/router";

export default function Page() {
  return (
    <div className="min-h-screen  overflow-y-auto w-full justify-center items-start flex bg-[#eff2f6]">
      <div className="w-full text-main flex-col mt-10 rounded-lg max-w-[480px] flex justify-center items-center">
        <JoobleLogo width={88} height={31} className="mb-6" />
        <EmployerRegistration />
        <div className="text-gray-600 max-sm:text-xs max-sm:px-4">
          Already have an account?{" "}
          <a
            href={ROUTES.EMPLOYER.LOGIN}
            className="text-blue-500 hover:underline font-semibold transition-all cursor-pointer"
          >
            Employer login
          </a>
        </div>
      </div>
    </div>
  );
}
