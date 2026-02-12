import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { useUserState } from "@/src/store/useUserState";
import clsx from "clsx";
import { User, Flame, Settings, LogOut, SendHorizontal } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export function UserSidebar({ className }: Props) {
  const { reset } = useOnboardingStore();

  const handleOut = async () => {
    reset();

    useUserState.getState().logout();
    await signOut({
      callbackUrl: "/vacancies",
      redirect: true,
    });
  };
  const router = useRouter();
  return (
    <div
      className={clsx("justify-start items-center top-full w-full", className)}
    >
      <div className="bg-white fllex flex-col py-1 rounded-lg select-none">
        <div
          className="hover:bg-[#6380a61a] flex flex-row gap-[6px] cursor-pointer p-3"
          onClick={() => router.push("/profile")}
        >
          <User size={22} className="text-[#a1afc1]" />
          <span className="text-[#2a3540] font-normal">My profile</span>
        </div>
        <div
          onClick={() => router.push("/recommendations")}
          className="hover:bg-[#6380a61a] flex flex-row gap-[6px] cursor-pointer p-3"
        >
          <Flame size={22} className="text-[#a1afc1]" />
          <span className="text-[#2a3540] font-normal">Recomendations</span>
        </div>
        <div className="hover:bg-[#6380a61a] flex flex-row gap-[6px] cursor-pointer p-3">
          <SendHorizontal size={22} className="text-[#a1afc1]" />
          <span className="text-[#2a3540] font-normal">Responses</span>
        </div>
        <div className="hover:bg-[#6380a61a] flex flex-row gap-[6px] cursor-pointer p-3">
          <Settings size={22} className="text-[#a1afc1]" />
          <span className="text-[#2a3540] font-normal">Settings</span>
        </div>
        <div className="w-full py-[7px]">
          <span className="block h-[1px] w-full bg-[#6380A626]"></span>
        </div>
        <div
          className="hover:bg-[#6380a61a] flex flex-row gap-[6px] cursor-pointer p-3"
          onClick={async () => handleOut()}
        >
          <LogOut size={22} className="text-[#a1afc1]" />
          <span className="text-[#2a3540] font-normal">Logout</span>
        </div>
      </div>
    </div>
  );
}
