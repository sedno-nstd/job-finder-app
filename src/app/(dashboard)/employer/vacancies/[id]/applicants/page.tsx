import { GetApplicants } from "@/src/actions/employer/user/getApplicants";
import { ApplicantsList } from "@/src/components/employer/applicants/ApplicantsList";
import { ErrorBlock } from "@/src/components/ui/base/ErrorBlock";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;
  const { page } = await searchParams;

  const currentPage = Number(page) || 1;

  const applicants = await GetApplicants(id);

  if ("error" in applicants) {
    return <ErrorBlock message="Ошибка доступа" />;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Responses on the vacancy</h1>

      <ApplicantsList
        vacancyId={id}
        initialApplicants={applicants}
        currentPage={currentPage}
      />
    </div>
  );
}
