import { Flame } from "lucide-react";
import { useRouter } from "next/router";

export function NoResponsesView() {
  const router = useRouter();
  return (
    <div className="w-full max-w-[448px] flex-col bg-white p-6 flex items-center justify-center mx-auto mt-10 rounded-xl shadow-sm border border-gray-100">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#6380a61a]/70">
        <Flame size={40} className="text-[#5a6f87]" />
      </div>
      <span className="text-2xl leading-8 font-bold mt-6 mb-2">
        No responses yet
      </span>
      <p className="max-w-[320px] text-base leading-6 text-center text-gray-500 mb-6">
        Start your career journey by responding to interesting vacancies
      </p>
      <button
        onClick={() => router.push("/vacancies")}
        className="w-full rounded-lg border border-[#0B64D9]/30 text-[#0b64d9] hover:text-white cursor-pointer duration-200 transition-colors hover:bg-blue-600 h-[48px] font-bold"
      >
        Go to search
      </button>
    </div>
  );
}
