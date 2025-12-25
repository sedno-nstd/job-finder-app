"use client";
import { useUserState } from "@/src/store/useUserState";
import { useRouter } from "next/navigation";

export function Respond() {
  const { user } = useUserState();
  const router = useRouter();

  const handleApply = () => {
    if (!user?.surname) {
      router.push("/profile");
    } else {
      return null;
    }
  };

  return (
    <div>
      <button
        className="rounded-lg bg-blue-600 text-white w-full h-[40px] cursor-pointer"
        onClick={() => {
          handleApply();
        }}
      >
        <span className="text-lg">respond</span>
      </button>
    </div>
  );
}
