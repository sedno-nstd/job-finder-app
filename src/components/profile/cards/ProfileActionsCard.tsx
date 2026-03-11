import { Link, Plus } from "lucide-react";
import { PROFILE_MOCKS } from "./mock/type";

export function ProfileActionsCard() {
  return (
    <div className="flex flex-col p-6 text-main rounded-lg bg-white w-full">
      <h1 className="font-semibold text-2xl mb-1">Supplement your profile</h1>
      <span>Well-filled profiles are viewed more often</span>
      {PROFILE_MOCKS.additional.map((item) => (
        <Link href={item.link} key={item.id} className="flex flex-row gap-2">
          <Plus size={24} className="p-2 bg-blue-600 text-white" />
          <span>{item.name}</span>
        </Link>
      ))}
    </div>
  );
}
