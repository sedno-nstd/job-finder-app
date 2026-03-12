import { JoobleLogo } from "@/public/images/userHeader/logo";
import { Login } from "@/src/components/employerRegistation/Login";

export default function Page() {
  return (
    <div className="w-full max-w-[448px] min-h-screen h-full flex flex-col justify-start items-center bg-[#eff2f6]">
      <JoobleLogo width={88} height={31} className=" mt-10" />
      <Login className="w-[608px]" />
      <div>
        <span>You haven't registration? </span>
        <a href="/employerRegistration/registration">
          <span className="text-blue-500 duration-200 transition-all hover:underline hover:underline-offset-4 tracking-wider leading-tight">
            Registration for employers
          </span>
        </a>
      </div>
    </div>
  );
}
