import { JoobleLogo } from "@/public/images/userHeader/logo";
import { Registration } from "@/src/components/employerRegistation/Registration";

export default function Page() {
  return (
    <div className="min-h-screen  overflow-y-auto w-full justify-center items-start flex bg-[#eff2f6]">
      <div className="w-full text-main flex-col mt-10 rounded-lg max-w-[480px] flex justify-center items-center">
        <JoobleLogo width={88} height={31} className="mb-6" />
        <Registration />
      </div>
    </div>
  );
}
