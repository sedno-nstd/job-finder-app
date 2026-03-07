import { ApplicationWithApplicant } from "@/src/types/employer";

interface Props {
  applications: ApplicationWithApplicant[];
}

export function VacancyApplicants({ applications }: Props) {
  if (!applications) return null;

  return (
    <div className="mt-10 pt-8 border-t-2 border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-6">
        Applicants ({applications.length})
      </h3>

      <div className="flex flex-col gap-4">
        {applications.length > 0 ? (
          applications.map((app: any) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 transition-colors hover:bg-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {app.applicant?.name?.[0]?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-bold text-slate-800">
                    {app.applicant?.name || "Unknown User"}
                  </p>
                  <p className="text-xs text-slate-500 italic">
                    Applied on {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                View CV
              </button>
            </div>
          ))
        ) : (
          <p className="text-slate-400 italic">No one has applied yet.</p>
        )}
      </div>
    </div>
  );
}
