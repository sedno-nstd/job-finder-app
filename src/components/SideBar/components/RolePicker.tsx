import Link from "next/link";

export function RolePicker() {
  return (
    <div className="absolute justify-center rounded-lg bg-white left-1/2 -translate-x-1/2 w-full">
      <div className="rounded-lg flex flex-col border-[1px] border-[rgba(99,128,166,0.1)] min-w-max duration-200 transition-all c">
        <Link
          href="/register?role=applicant"
          className="py-3 px-4 hover:bg-gray-300/35 flex justify-start border-b-[1px] border-[rgba(99,128,166,0.1)] cursor-pointer"
        >
          <span className="text-[#2d3540] font-normal text-[16px] leading-[24px] font-sans whitespace-nowrap">
            As an applicant
          </span>
        </Link>
        <button className="py-3 px-4 hover:bg-gray-300/35 flex justify-start cursor-pointer">
          <span className="text-[#2d3540] font-normal text-[16px] leading-[24px] font-sans whitespace-nowrap">
            As an employer
          </span>
        </button>
      </div>
    </div>
  );
}
