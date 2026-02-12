import { Heart, MessageSquare, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserSidebar } from "../../shared/UserSidebar";

interface Props {
  showProfileModal: boolean;
  setShowProfileModal: (state: boolean) => void;
  profileRef: any;
}

export function HeaderNavigation({
  setShowProfileModal,
  showProfileModal,
  profileRef,
}: Props) {
  const { data } = useSession();
  const router = useRouter();

  const existUser = data?.user;

  const ACTIONS = [
    {
      id: "chats",
      icon: MessageSquare,
      hasLink: true,
      href: "/chats",
      label: "Chats",
      canEnter: existUser,
    },
    {
      id: "saved",
      icon: Heart,
      hasLink: true,
      href: "/saved",
      label: "Saved",
      canEnter: existUser,
    },
    {
      id: "profile",
      icon: User,
      hasLink: false,
      href: "",
      label: "Profile",
    },
  ];

  return (
    <div className="flex flex-row px-5 items-center relative">
      {ACTIONS.map((item) => (
        <button
          key={item.id}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            (item.hasLink && item.canEnter && router.push(item.href)) ||
              (!item.hasLink &&
                !item.canEnter &&
                setShowProfileModal(!showProfileModal));
          }}
          className="p-3 duratiob-200 cursor-pointer transition-colors hover:bg-[#6380a61a] focus:bg-[#6380a61a] rounded-lg relative flex flex-row gap-2 text-[#5a6f87] hover:text-[#2d3540] focus:text-[#2d3540] font-medium"
        >
          <item.icon size={24} className="" />
          <span>{item.label}</span>
        </button>
      ))}
      {showProfileModal && (
        <div
          ref={profileRef}
          className="absolute w-full max-w-[248px] top-full right-0"
        >
          <UserSidebar className="border-[0.5px] rounded-lg border-gray-400" />
        </div>
      )}
    </div>
  );
}
