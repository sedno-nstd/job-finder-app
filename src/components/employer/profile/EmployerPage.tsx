"use client";
import { GetVacancies } from "@/src/actions/employer/vacancies/getEmployerVacancies";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EmployerVacancyList } from "../dashboard/EmployerVacancyList";
import { useRouter } from "next/navigation";
import { EmployerUrgentVacanciesList } from "../ui/EmployerUrgentVacanciesList";
import { EmployerVacancy } from "@/src/types/employer";

export default function EmployerPage() {
  const { data: session, status } = useSession();
  const user = session?.user;

  const [data, setData] = useState<EmployerVacancy[]>([]);
  const [count, setCount] = useState(5);
  const router = useRouter();

  const totalApplications = () => {
    const count = data.reduce((acc, vacancy) => {
      return acc + (vacancy.application?.length || 0);
    }, 0);
    return count;
  };

  const now = new Date();

  const activeVacancies = data.filter((v) => new Date(v.expiresAt) > now);

  const handleShowMore = () => {
    count <= data.length ? setCount((prev) => prev + 5) : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetVacancies();
        if (!data) console.log("Error");
        setData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/employerRegistration/login");
    }
  }, [status, router]);

  const defaultImage = user?.companyName?.[0];
  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 flex flex-col">
      <header className="bg-white rounded-2xl p-8 mb-8 flex flex-col md:flex-row items-center justify-between border border-slate-200 shadow-sm">
        <div className="flex items-center gap-8">
          {user?.image ? (
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white">
              <Image
                src={user.image}
                fill
                className="object-cover"
                alt="logo"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-lg">
              {defaultImage?.toUpperCase()}
            </div>
          )}

          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {user?.companyName}
            </h1>
            <div className="flex gap-6 mt-3">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  Total Vacancies
                </span>
                <span className="text-lg font-bold text-slate-700">
                  {data.length}
                </span>
              </div>
              <div className="w-[1px] h-10 bg-slate-100" />
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  Total Apps
                </span>
                <span className="text-lg font-bold text-blue-600">
                  {totalApplications()}
                </span>
              </div>
              <div className="w-[1px] h-10 bg-slate-100" />
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">
                  Active Now
                </span>
                <span className="text-lg font-bold text-green-600">
                  {activeVacancies.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push("/create-vacancy")}
          className="mt-6 cursor-pointer md:mt-0 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all active:scale-95"
        >
          Post a Vacancy
        </button>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
              <h2 className="font-bold text-slate-800 text-lg">
                Current Vacancies
              </h2>
              <button className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer">
                Manage All
              </button>
            </div>

            <div className="p-2 pb-10">
              {data.length >= 1 ? (
                <EmployerVacancyList
                  hasMore={count < data.length}
                  showMore={handleShowMore}
                  vacancies={data.slice(0, count)}
                  className="w-full justify-center flex items-center"
                />
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400 italic">
                  No active vacancies. Start by creating one.
                </div>
              )}
            </div>
          </div>
        </div>

        <aside className="lg:col-span-4">
          <EmployerUrgentVacanciesList
            data={data}
            className="rounded-2xl shadow-sm sticky top-8"
          />
        </aside>
      </div>
    </div>
  );
}
