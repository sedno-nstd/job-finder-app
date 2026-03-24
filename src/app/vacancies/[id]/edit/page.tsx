import { prisma } from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/config/auth";
import { notFound, redirect } from "next/navigation";
import { EmployerVacancyForm } from "@/src/components/employer/create-vacancy/EmployerVacancyForm";
import { ROUTES } from "@/src/config/router";
import { JOB_LEVELS } from "@/src/config/searchOptions";
import { EMPLOYMENT_TYPES } from "@/src/domain/vacancy/mock";

export default async function EditVacancyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authConfig);

  if (!session?.user) redirect(ROUTES.EMPLOYER.REGISTRATION);

  const vacancy = await prisma.vacancy.findUnique({
    where: { id: id },
  });

  if (!vacancy || vacancy.employerId !== (session.user as any).id) {
    notFound();
  }

  const initialData = {
    ...vacancy,
    level: vacancy.level
      ? JOB_LEVELS.filter((l) => vacancy.level.split(/,\s*/).includes(l))
      : [],

    employmentType: vacancy.employmentType
      ? EMPLOYMENT_TYPES.filter((t) =>
          vacancy.employmentType.split(/,\s*/).includes(t.id),
        )
      : [],

    stack: vacancy.stack ? vacancy.stack.split(/,\s*/) : [],
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-slate-800">
        Edit Vacancy: {vacancy.title}
      </h1>
      <EmployerVacancyForm initialData={initialData as any} />
    </div>
  );
}
