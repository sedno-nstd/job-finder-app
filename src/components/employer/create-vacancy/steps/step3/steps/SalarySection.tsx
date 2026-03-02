import { FormField } from "@/src/components/ui/FormField";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface Props {
  isNegotiable: boolean;
}

export function SalarySection({ isNegotiable }: Props) {
  const array = [
    {
      name: "salaryFrom",
      id: "from",
      label: "Salary from",
    },
    {
      name: "salaryTo",
      id: "to",
      label: "Salary to",
    },
  ];
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div
      className={clsx(
        "flex flex-row justify-between gap-3 mb-5",
        isNegotiable ? "opacity-30 pointer-events-none" : "opacity-100",
      )}
    >
      {array.map((item) => {
        return (
          <div key={item.id}>
            <FormField {...register(item.name)} placeholder={item.label} />
            {errors[item.name] && (
              <span className="text-sm text-red-500 font-medium">
                {String(errors[item.name]?.message)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
