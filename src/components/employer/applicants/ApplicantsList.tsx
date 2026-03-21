"use client";
import { ApplicantCard } from "./ApplicantCard";
import { ChevronDown } from "lucide-react";
import { ApplicantResponse } from "@/src/types/user";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface ApplicantsListProps {
  initialApplicants: ApplicantResponse[];
  currentPage: number;
  vacancyId: string;
}

export function ApplicantsList({
  initialApplicants,
  currentPage,
  vacancyId,
}: ApplicantsListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const ITEMS_PER_PAGE = 20;
  const visibleCount = currentPage * ITEMS_PER_PAGE;
  const visibleApplicants = initialApplicants.slice(0, visibleCount);
  const hasMore = initialApplicants.length > visibleCount;

  const showMore = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", (currentPage + 1).toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    setTimeout(() => {
      window.scrollBy({ top: 400, behavior: "smooth" });
    }, 100);
  };

  if (initialApplicants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 bg-white border-2 border-dashed border-slate-200 rounded-2xl">
        it's all
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="flex justify-between items-center mb-2 px-2">
        <span className="text-sm font-medium text-slate-500">
          Showing {visibleApplicants.length} of {initialApplicants.length}{" "}
          candidates
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {visibleApplicants.map((app, index) => (
          <ApplicantCard
            vacancyId={vacancyId}
            key={app.id}
            applicant={app}
            appliedAt={app.createdAt}
            isNewBatch={index >= (currentPage - 1) * ITEMS_PER_PAGE}
          />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={showMore}
          className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-white border border-slate-200 rounded-xl text-blue-600 font-semibold hover:bg-blue-50 transition-all shadow-sm"
        >
          <ChevronDown size={20} />
          Show 20 more candidates
        </button>
      )}
    </div>
  );
}
