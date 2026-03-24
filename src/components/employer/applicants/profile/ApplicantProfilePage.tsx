import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Mail,
  ArrowLeft,
  Clock,
  Banknote,
} from "lucide-react";
import { WriteMessageButton } from "./WriteMessageButton";
import { GetApplicantById } from "@/src/actions/employer/user/GetApplicantById";

type ApplicantData = Awaited<ReturnType<typeof GetApplicantById>>;

interface Props {
  applicant: ApplicantData;
  vacancyId: string;
}

export default async function ApplicantProfilePage({
  applicant,
  vacancyId,
}: Props) {
  if (!applicant || !applicant.detailInfo) {
    notFound();
  }

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(applicant.name || "User")}&background=0b64d9&color=fff&size=256`;
  const avatarSrc = applicant.image || fallbackAvatar;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <Link
        href={`/employer/vacancies/${vacancyId}/applicants`}
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors w-fit text-sm font-medium"
      >
        <ArrowLeft size={16} />
        <span>Back to applicants list</span>
      </Link>

      <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm flex-shrink-0">
          <Image
            src={avatarSrc}
            alt={applicant.name || "Applicant"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">
            {applicant.detailInfo.firstName} {applicant.detailInfo.lastName}
          </h1>
          <p className="text-blue-600 font-medium text-lg mt-1">
            {applicant.detailInfo.role}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3 mt-5">
            <span className="flex items-center gap-1.5 text-slate-500 text-sm">
              <MapPin size={16} className="text-slate-400" />
              {applicant.detailInfo.location}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 text-sm">
              <Briefcase size={16} className="text-slate-400" />
              {applicant.detailInfo.experienceDuration}
            </span>
            <span className="flex items-center gap-1.5 text-slate-500 text-sm">
              <Mail size={16} className="text-slate-400" />
              {applicant.email}
            </span>
          </div>
        </div>

        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <WriteMessageButton opponentId={applicant.id} vacancyId={vacancyId} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 space-y-6">
          <section className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100/50">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              About Candidate
            </h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
              {applicant.detailInfo.aboutMe || "No description provided."}
            </p>
          </section>

          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">
              Desired Roles
            </h2>
            <div className="flex flex-wrap gap-2">
              {applicant.detailInfo.desiredJob?.map((job) => (
                <span
                  key={job}
                  className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-slate-200 transition-colors"
                >
                  {job}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="md:col-span-4 space-y-6">
          <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-3xl relative overflow-hidden">
            <h3 className="flex items-center gap-2 font-bold text-blue-800/60 text-xs uppercase tracking-wider mb-2">
              <Banknote size={14} /> Financial Expectations
            </h3>
            <div className="text-2xl font-bold text-blue-950">
              {applicant.detailInfo.salaryAmount ? (
                <>
                  {applicant.detailInfo.salaryAmount}{" "}
                  {applicant.detailInfo.salaryCurrency}
                  <span className="text-sm font-normal text-blue-800/60 ml-1">
                    /{applicant.detailInfo.salaryPeriod}
                  </span>
                </>
              ) : (
                "Negotiable"
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="flex items-center gap-2 font-bold text-slate-400 text-xs uppercase tracking-wider mb-4">
              <Clock size={14} /> Employment Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {applicant.detailInfo.jobType?.map((type) => (
                <span
                  key={type}
                  className="px-3 py-1 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
