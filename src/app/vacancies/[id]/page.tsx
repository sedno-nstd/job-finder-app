import VacancyDetails from "@/src/components/vacancy/details/VacancyDetails";
import { GetVacancies } from "@/src/actions/vacancies/getVacancies";
import { recordView } from "@/src/actions/employer/vacancies/recordView";
import { getServerSession } from "next-auth";
import { authConfig } from "@/src/config/auth";
import { prisma } from "src/lib/prisma";
import { ErrorBlock } from "@/src/components/ui/base/ErrorBlock";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vacancy = await GetVacancies({ vacancyId: id });
  const session = await getServerSession(authConfig);

  let isFavorite = false;
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { favoriteVacancies: { where: { id: vacancy?.id } } },
    });
    isFavorite = (user?.favoriteVacancies?.length ?? 0) > 0;
  }

  if (!vacancy) return <ErrorBlock />;
  await recordView(id);

  return (
    <div className="w-full flex items-center justify-center">
      <VacancyDetails
        vacancy={vacancy}
        initialIsFavorite={isFavorite}
        className="max-w-[640px]"
      />
    </div>
  );
}
