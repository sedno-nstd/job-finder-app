"use client";
import { GetVacancies } from "@/src/actions/employer/getEmployerVacancies";
import { Vacancy } from "@/src/config/types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EmployerVacancyList } from "./dashboard/EmployerVacancyList";
import { useRouter } from "next/navigation";

interface ApplicationWithApplicant {
  id: string;
  status: string;
  applicant: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

interface EmployerVacancy extends Vacancy {
  expiresAt: Date;
  application: ApplicationWithApplicant[];
}

export default function EmployerPage() {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [data, setData] = useState<EmployerVacancy[]>([]);
  const router = useRouter();
  const [error, setError] = useState(false);

  const totalApplications = () => {
    const count = data.reduce((acc, vacancy) => {
      return acc + (vacancy.application?.length || 0);
    }, 0);
    return count;
  };

  const now = new Date();

  const activeVacancies = data.filter((v) => new Date(v.expiresAt) > now);

  const expiredVacancies = data.filter((v) => new Date(v.expiresAt) <= now);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetVacancies();
        if (!data) console.log("Error");
        setData(data);
        setError(false);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    fetchData();
  }, []);

  const defaultImage = user?.companyName?.[0];
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className=" bg-slate-50 p-10 rounded-xl flex flex-row justify-start items-center w-full max-w-[900px]">
        <div>
          {user?.image ? (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              <Image src={user?.image} width={80} height={80} alt="image" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              {defaultImage?.toUpperCase()}
            </div>
          )}
        </div>
        <div className="ml-20 font-medium flex flex-col items-start">
          <span className="text-2xl font-bold mb-1">{user?.companyName}</span>
          <span className="cursor-pointer hover:text-gray-500">
            {error ? "Something went wrong" : `Vacancies: ${data.length}`}
          </span>
          <span className="cursor-pointer hover:text-gray-500">
            {error
              ? "Something went wrong"
              : `Applications: ${totalApplications()}`}
          </span>
          <span className="cursor-pointer hover:text-gray-500">
            {error
              ? "Something went wrong"
              : `Active: ${activeVacancies.length === 0 ? 0 : activeVacancies.length}`}
          </span>
        </div>
        <div className="w-full max-w-[550px] flex justify-end">
          <button
            onClick={() => router.push("/create-vacancy")}
            className="rounded-full cursor-pointer duration-200 transition-all text-white h-[40px] px-5 bg-blue-600 hover:bg-blue-700 font-medium"
          >
            Create vacancy
          </button>
        </div>
      </div>
      <div className="max-w-[900px] mt-5 w-full flex flex-col justify-center items-center border border-gray-300">
        {data.length > 1 ? (
          <EmployerVacancyList vacancies={data} />
        ) : (
          "Try to create Vacancy"
        )}
      </div>
    </div>
  );
}
