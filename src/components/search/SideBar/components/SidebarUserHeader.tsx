import { Ellipsis } from "lucide-react";

interface SideUserProps {
  showUserMenu: boolean;
  setShowUserMenu: (s: boolean) => void;
  userName: string | null | undefined;
  userImage: string | null | undefined;
  role: string | null | undefined;
}

export function SideUserheader({
  setShowUserMenu,
  showUserMenu,
  userName,
  userImage,
  role,
}: SideUserProps) {
  return (
    <div
      onClick={() => setShowUserMenu(!showUserMenu)}
      className="rounded-lg hover:bg-[#6380a61a] flex flex-row p-2 cursor-pointer w-full items-center"
    >
      <div className="mr-[12px] shrink-0">
        {userImage ? (
          <img
            referrerPolicy="no-referrer"
            src={userImage}
            alt="Avatar"
            className="w-12 h-12 rounded-full border border-gray-200"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#6380a61a] flex items-center justify-center text-[#5a6f87] font-bold select-none">
            "A"
          </div>
        )}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[#2d3540] font-bold text-base truncate">
          {userName}
        </span>
        <span className="text-[#5a6f87] text-sm select-none">
          {role === "employer" ? "Company profile" : "My profile"}
        </span>
      </div>
      <Ellipsis size={22} className="ml-auto text-[#5a6f87]" />
    </div>
  );
}
