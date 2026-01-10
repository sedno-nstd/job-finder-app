import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { useUserState } from "@/src/store/useUserState";
import { useRouter } from "next/navigation";

export function RolePicker() {
  const { startRegistration } = useUserState();
  const { updatedFields } = useOnboardingStore();
  const router = useRouter();

  const handleRoleSelect = (role: "applicant" | "employer") => {
    startRegistration(role, false);

    updatedFields({ role: role });

    router.push(`/register?role=${role}`);
  };
  return (
    <div className="absolute justify-center rounded-lg bg-white left-1/2 -translate-x-1/2 w-full">
      <div className="rounded-lg flex flex-col border-[1px] border-[rgba(99,128,166,0.1)] min-w-max duration-200 transition-all c">
        <button
          onClick={() => handleRoleSelect("applicant")}
          className="py-3 px-4 hover:bg-gray-50 flex justify-start border-b border-gray-100 cursor-pointer w-full text-left"
        >
          <span className="text-[#2d3540]">As an applicant</span>
        </button>
        <button
          className="py-3 px-4 hover:bg-gray-300/35 flex justify-start cursor-pointer"
          onClick={() => handleRoleSelect("employer")}
        >
          <span className="text-[#2d3540] font-normal text-[16px] leading-[24px] font-sans whitespace-nowrap">
            As an employer
          </span>
        </button>
      </div>
    </div>
  );
}
