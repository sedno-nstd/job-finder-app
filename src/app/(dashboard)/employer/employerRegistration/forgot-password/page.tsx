import { JoobleLogo } from "@/public/images/userHeader/logo";
import { ForgotPassword } from "@/src/components/employerRegistation/ForgotPassword";

export default function Page() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#eff2f6] py-10">
      <JoobleLogo width={88} height={31} />
      <ForgotPassword />
    </div>
  );
}
