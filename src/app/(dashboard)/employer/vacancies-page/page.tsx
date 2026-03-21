import { VacanciesPage } from "@/src/components/employer/vacancies-page/VacanciesPage";

export default function Page() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full justify-center items-center flex min-h-full mt-10">
        <VacanciesPage
          vacancyClassName="max-w-[448px]"
          className="justify-center items-center max-w-[600px]"
        />
      </div>
    </div>
  );
}
