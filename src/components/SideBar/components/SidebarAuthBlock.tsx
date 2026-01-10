import clsx from "clsx";
import { ArrowRight } from "lucide-react";
import { RolePicker } from "./RolePicker";
import { useUserState } from "@/src/store/useUserState";
import { useRouter } from "next/navigation";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";

interface AuthProps {
  showRolePicker: boolean;
  setShowRolePicker: (s: boolean) => void;
}

export function AuthBlock({ setShowRolePicker, showRolePicker }: AuthProps) {
  const { startRegistration } = useUserState();
  const { updatedFields } = useOnboardingStore();
  const router = useRouter();

  const handleCreateProfile = () => {
    startRegistration("applicant", true);
    updatedFields({ role: "applicant" });
  };
  return (
    <div className="p-4 bg-white flex flex-col mb-4 border border-gray-100 rounded-xl">
      <span className="mb-3 text-sm text-[#5a6f87]">
        Employers will see you in our database and offer jobs.
      </span>
      <div className="flex flex-col gap-2 relative">
        <button
          className="rounded-lg py-2 bg-blue-700 text-white font-medium hover:bg-blue-800 transition-all"
          onClick={() => {
            handleCreateProfile();
            router.push("/registration");
          }}
        >
          Create profile
        </button>

        <div className="relative">
          <button
            onClick={() => setShowRolePicker(!showRolePicker)}
            className={clsx(
              "flex items-center justify-center gap-2 w-full py-2 border rounded-lg transition-all",
              showRolePicker
                ? "border-blue-600 text-blue-600 shadow-sm"
                : "border-blue-600/30 text-blue-600 hover:bg-blue-50"
            )}
          >
            <span className="font-medium">Enter</span>
            <ArrowRight size={20} />
          </button>

          {showRolePicker && <RolePicker />}
        </div>
      </div>
    </div>
  );
}
