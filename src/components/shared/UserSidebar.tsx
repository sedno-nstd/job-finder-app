import { SIDEBAR_LINKS } from "@/src/config/menu";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { useUserState } from "@/src/store/useUserState";
import clsx from "clsx";
import { LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export function UserSidebar({ className }: Props) {
  const { data: session } = useSession();
  const { reset } = useOnboardingStore();
  const router = useRouter();

  const myId = (session?.user as any)?.id;
  const role = (session?.user as any)?.role || "applicant";

  const links = [
    ...SIDEBAR_LINKS[role as keyof typeof SIDEBAR_LINKS],
    ...SIDEBAR_LINKS.common,
  ];

  const handleNavigation = (href: string | ((id: string) => string)) => {
    const destination = typeof href === "function" ? href(myId) : href;
    router.push(destination);
  };

  const handleOut = async () => {
    reset();

    useUserState.getState().logout();
    await signOut({
      callbackUrl: "/vacancies",
      redirect: true,
    });
  };

  return (
    <div
      className={clsx("justify-start items-center top-full w-full", className)}
    >
      <div className="bg-white flex flex-col py-1 rounded-lg select-none">
        {links.map((link, index) => (
          <div
            key={`${link.href}-${index}`}
            className="hover:bg-[#6380a61a] flex flex-row gap-[6px] cursor-pointer p-3"
            onClick={() => handleNavigation(link.href)}
          >
            <link.icon size={22} className="text-[#a1afc1]" />
            <span className="text-[#2a3540] font-normal">{link.label}</span>
          </div>
        ))}

        <div className="w-full py-[7px]">
          <span className="block h-[1px] w-full bg-[#6380A626]"></span>
        </div>

        <div
          className="hover:bg-[#6380a61a] flex flex-row gap-[6px] cursor-pointer p-3"
          onClick={handleOut}
        >
          <LogOut size={22} className="text-[#a1afc1]" />
          <span className="text-[#2a3540] font-normal">Logout</span>
        </div>
      </div>
    </div>
  );
}
