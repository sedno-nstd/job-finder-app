import { GetApplicantById } from "@/src/actions/employer/user/GetApplicantById";
import ApplicantProfilePage from "@/src/components/employer/applicants/profile/ApplicantProfilePage";

import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
    applicantId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id, applicantId } = await params;

  if (!applicantId) {
    console.error("No applicantId provided in URL");
    return notFound();
  }

  const applicant = await GetApplicantById(applicantId);

  if (!applicant || !applicant.detailInfo) {
    return notFound();
  }

  return <ApplicantProfilePage applicant={applicant} vacancyId={id} />;
}
