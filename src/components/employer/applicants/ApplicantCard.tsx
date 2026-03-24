import Image from "next/image";
import { Briefcase, DollarSign, User } from "lucide-react";
import clsx from "clsx";
import { ApplicantResponse } from "@/src/types/user";
import Link from "next/link";
import { ROUTES } from "@/src/config/router";

interface Props {
  applicant: ApplicantResponse;
  appliedAt: Date;
  isNewBatch: boolean;
  vacancyId: string;
  vacancyTitle?: string;
}

export function ApplicantCard({
  applicant,
  appliedAt,
  isNewBatch,
  vacancyId,
  vacancyTitle,
}: Props) {
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(applicant.applicant.name)}&background=0b64d9&color=fff`;

  const avatarSrc = applicant.applicant.image || fallbackAvatar;
  return (
    <Link
      href={ROUTES.EMPLOYER.APPLICANT_PROFILE(
        vacancyId,
        applicant.applicant.id,
      )}
    >
      <div
        className={clsx(
          "group bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer",
          isNewBatch && "border-b border-gray-300",
        )}
      >
        <div className="flex items-center gap-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
            <Image
              src={avatarSrc}
              alt={applicant.applicant.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-slate-900 truncate">
              {applicant.applicant.name}
              {vacancyTitle && (
                <span className="ml-2 text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium uppercase tracking-wider">
                  on {vacancyTitle}
                </span>
              )}
            </h3>
            <p className="text-blue-600 font-medium text-sm">
              {applicant.applicant.detailInfo?.desiredJob?.length
                ? applicant.applicant.detailInfo.desiredJob.join(", ")
                : "Position not specified"}
            </p>
          </div>

          <div className="hidden md:flex flex-col gap-1 w-1/3">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Briefcase size={14} />
              <span>{applicant.applicant.detailInfo?.experienceDuration}</span>
            </div>
            <p className="text-xs text-slate-400 truncate">
              Last at:{" "}
              <span className="text-slate-600">
                {applicant.applicant.detailInfo?.previousPosition}
              </span>
            </p>
          </div>

          <div className="text-right flex-shrink-0">
            <div className="flex items-center justify-end gap-4 text-green-600  font-bold">
              <span>{`${applicant.applicant.detailInfo?.salaryAmount || "negoitable"}`}</span>
              <span>{applicant.applicant.detailInfo?.salaryCurrency}</span>
            </div>
            <p className="text-[10px] uppercase text-slate-400 font-bold tracking-tight">
              {applicant.applicant.detailInfo?.jobType}
            </p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-slate-50 flex justify-end">
          <span className="text-[10px] text-slate-400">
            Applied on {new Date(appliedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
