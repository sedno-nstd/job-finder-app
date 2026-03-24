import { ApplicantCard } from "@/src/components/employer/applicants/ApplicantCard";
import Link from "next/link";

import { GetAllApplicants } from "@/src/actions/employer/user/getApplicants";
import { ROUTES } from "@/src/config/router";
import { ErrorBlock } from "../../ui/base/ErrorBlock";

export default async function AllApplicantsPage() {
  const res = await GetAllApplicants();

  if (!res.success || !res.data) return <ErrorBlock />;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Responses Dashboard</h1>

      {res.data.length === 0 ? (
        <div className="text-center p-20 border-2 border-dashed rounded-xl">
          No applications yet.
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {res.data.map((vacancy) => (
            <section key={vacancy.id} className="flex flex-col gap-4">
              <div className="flex justify-between items-end border-b pb-2">
                <div>
                  <h2 className="text-xl font-bold text-blue-600">
                    {vacancy.title}
                  </h2>
                  <p className="text-sm text-slate-500">
                    Total responses: {vacancy._count.application}
                  </p>
                </div>

                <Link
                  href={ROUTES.EMPLOYER.APPLICANTS(vacancy.id)}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  View all →
                </Link>
              </div>

              <div className="grid gap-3">
                {vacancy.application.map((app) => (
                  <ApplicantCard
                    key={app.id}
                    applicant={app as any}
                    appliedAt={app.createdAt}
                    vacancyId={vacancy.id}
                    isNewBatch={false}
                    vacancyTitle={vacancy.title}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
