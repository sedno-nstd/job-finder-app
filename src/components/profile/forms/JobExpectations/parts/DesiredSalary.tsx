import { FormField } from "@/src/components/ui/base/FormField";
import { useFormContext } from "react-hook-form";

export function DesiredSalary() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col mb-3">
      <span className="font-semibold mb-2">Desired salary</span>
      <FormField
        type="text"
        placeholder="For example, 12000"
        {...register("amount")}
        className="h-[40px] border"
      />
      {errors.amount && (
        <span className="text-sm font-medium text-red-500">
          {String(errors?.amount?.message)}
        </span>
      )}
    </div>
  );
}
