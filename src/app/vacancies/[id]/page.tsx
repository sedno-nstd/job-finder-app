import VacancyDetails from "@/src/components/vacancy/details/VacancyDetails";
import { GetVacancies } from "@/src/actions/getVacancies";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vacancy = await GetVacancies({ vacancyId: id });

  if (!vacancy) return <div>Vacancy not found</div>;

  return <VacancyDetails vacancy={vacancy} />;
}
