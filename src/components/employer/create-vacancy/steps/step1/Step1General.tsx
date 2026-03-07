import { useFormContext } from "react-hook-form";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import { useEmployerVacancyStore } from "@/src/store/employer/useEmployerVacancyStore";
import clsx from "clsx";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { EmploymentType } from "./parts/EmploymentType";
import { LevelField } from "./parts/Level";
import { JobTitleFields } from "./parts/JobTItleFields";
import { StackField } from "./parts/StackField";

interface IProps {
  className?: string;
}

export function Step1General({ className }: IProps) {
  const { nextStep } = useEmployerVacancyStore();

  const {
    trigger,
    formState: { errors },
  } = useFormContext();

  const handleNext = async () => {
    const isValid = await trigger([
      "title",
      "level",
      "stack",
      "employmentType",
    ]);
    if (isValid) {
      nextStep();
    } else {
      console.log("error");
    }
  };

  return (
    <FormWrapper
      as="div"
      label={"Role & Requirements"}
      className={clsx(
        "w-full flex justify-center rounded-lg bg-white",
        className,
      )}
    >
      <div className="flex flex-col gap-1 mb-6 relative">
        <span className="text-xl font-semibold mb-2">Write job title</span>
        <JobTitleFields name="title" />
      </div>

      <div className="flex flex-col">
        <span className="text-xl font-semibold mb-2">
          Choise employment type
        </span>
        <div className="w-full h-full flex flex-col">
          <EmploymentType name="employmentType" />
          <p className="mb-6">
            {errors.employmentType && (
              <span className="text-md font-medium text-red-500">
                {String(errors.employmentType.message)}
              </span>
            )}
          </p>
        </div>
      </div>

      <div>
        <p className="text-xl font-semibold mb-3">Choise job grade</p>
        <div className="w-full flex flex-row mb-6">
          <LevelField name="level" />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xl font-semibold mb-3">
          Choise required stacks (max 15)
        </p>
        <StackField name="stack" />
      </div>

      <div className="mb-4">
        <FormNavigation
          variant="update"
          buttonText="Continue"
          onSubmit={handleNext}
        />
      </div>
    </FormWrapper>
  );
}
