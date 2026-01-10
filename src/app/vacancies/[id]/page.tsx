import { vacancies } from "@/src/domain/vacancy/types";

import VacancyDetails from "@/src/components/vacancy/details/VacancyDetails";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vacancy = vacancies.find((v) => v.id === id);

  if (!vacancy) return <div>Vacancy not found</div>;

  return <VacancyDetails vacancy={vacancy} />;
}
