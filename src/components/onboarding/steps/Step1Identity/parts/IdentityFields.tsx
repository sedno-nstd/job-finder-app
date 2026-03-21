"use client";
import { FormField } from "@/src/components/ui/base/FormField";
import { useFormContext } from "react-hook-form";

export function IdentityFields() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-3">
        <label htmlFor="" className="mb-1">
          FirstName
        </label>
        <FormField
          {...register("firstName")}
          error={errors.firstName?.message as string}
        />
      </div>
      <div className="flex flex-col mb-3">
        <label htmlFor="" className="mb-1">
          LastName
        </label>
        <FormField
          {...register("lastName")}
          error={errors.lastName?.message as string}
        />
      </div>
    </div>
  );
}
