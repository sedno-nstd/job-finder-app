import { FormField } from "@/src/components/ui/FormField";
import clsx from "clsx";
import { useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label?: string;
  className?: string;
}

export function LastWorkPlace({
  name,
  label = "Last Workplace",
  className,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className={clsx("w-full h-full flex flex-col", className)}>
      <label htmlFor="" className="mb-1">
        {label}
      </label>
      <FormField
        {...register(name)}
        id={name}
        type="text"
        placeholder="Company title"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm font-medium mt-1">
          {errors[name].message as string}
        </span>
      )}
    </div>
  );
}
