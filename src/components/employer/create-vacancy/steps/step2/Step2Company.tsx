import { useFormContext } from "react-hook-form";
import { FormWrapper } from "@/src/components/shared/FormWrapper";
import clsx from "clsx";
import { useEmployerVacancyStore } from "@/src/store/employer/useEmployerVacancyStore";
import { FormNavigation } from "@/src/components/shared/FormNavigation";
import { FormField } from "@/src/components/ui/FormField";
import { SearchSuggestions } from "@/src/components/ui/SearchSuggestions";
import { useState } from "react";
import { fieldsConfig } from "./constans/type";

interface Props {
  className?: string;
}

export function Step2Company({ className }: Props) {
  const { formData, prevStep, nextStep } = useEmployerVacancyStore();

  const {
    register,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid },
  } = useFormContext();

  const [isOpen, setIsOpen] = useState<"company" | "city" | "country" | "">("");
  const handleOpen = (value: "company" | "city" | "country" | "") => {
    setIsOpen(value);
  };

  const isRemote = formData.employmentType === "remote";

  const handleNext = async () => {
    const isValid = await trigger(["company", "city", "company"]);
    if (isValid) {
      nextStep();
    }
  };

  return (
    <FormWrapper
      as="div"
      label={"Company & Workplace"}
      className={clsx(
        "w-full flex justify-center pb-6 rounded-lg bg-white",
        className,
      )}
    >
      <div className="flex flex-col gap-6 w-full">
        {fieldsConfig.map((item) => {
          const queryValue = watch(item.name);
          const alreadyWritted = item.data?.some(
            (t) => t.value?.toLowerCase() === queryValue?.toLowerCase(),
          );
          return (
            <div key={item.name} className="relative cursor-pointer">
              <FormField
                {...register(item.name)}
                placeholder={
                  item.name === "city" && isRemote
                    ? `${item.placeholder} (Optional)`
                    : item.placeholder
                }
                autoComplete="off"
                onFocus={() => item.hasSuggestion && handleOpen(item.name)}
              />
              {errors[item.name] && (
                <span className="text-md text-red-500 font-medium">
                  {String(errors[item.name]?.message)}
                </span>
              )}

              {item.hasSuggestion && (
                <SearchSuggestions
                  isOpen={isOpen === item.name}
                  query={queryValue}
                  setQuery={(value) => {
                    setValue(item.name, value, { shouldValidate: true });
                    setIsOpen("");
                  }}
                  data={item.data || []}
                  isShowOptions={!alreadyWritted}
                  sliceOptions={5}
                />
              )}
            </div>
          );
        })}
      </div>
      <FormNavigation
        variant="registration"
        onBack={prevStep}
        onSubmit={handleNext}
      />
    </FormWrapper>
  );
}
