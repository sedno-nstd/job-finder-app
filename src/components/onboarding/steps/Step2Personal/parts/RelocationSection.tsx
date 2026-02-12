"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
import { SelectUserLocation } from "../../../components/SelectUserLocation";
import { Plus } from "lucide-react";
import { useEffect } from "react";

export function RelocationSection() {
  const { register, setValue, watch, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "relocationLocations",
  });

  const relocationLocations = watch("relocationLocations") || [];
  const readyToRelocate = watch("readyToRelocate");
  const mainLocation = watch("location");

  useEffect(() => {
    if (readyToRelocate && fields.length === 0) {
      append("");
    }
  }, []);

  return (
    <>
      <div className="mb-2 flex flex-row gap-4 items-center text-main">
        <input
          type="checkbox"
          id="workAbroad"
          {...register("readyForWorkAbroad")}
          className="w-[18px] h-[18px] cursor-pointer accent-blue-600"
        />
        <label
          htmlFor="noResume"
          className="text-sm cursor-pointer select-none max-sm:text-base font-medium"
        >
          Ready to work abroad
        </label>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-4 items-center mb-3">
          <input
            type="checkbox"
            id="relocate"
            {...register("readyToRelocate")}
            className="w-[18px] h-[18px]  cursor-pointer accent-blue-600"
          />
          <label
            htmlFor="noResume"
            className="text-sm cursor-pointer select-none text-main font-medium"
          >
            Ready to work in other cities
          </label>
        </div>
        {readyToRelocate === true && (
          <div>
            {fields.map((field, index) => (
              <div className="mb-2" key={field.id}>
                <SelectUserLocation
                  registerName={`relocationLocations.${index}`}
                  key={index}
                  value={watch(`relocationLocations.${index}`)}
                  onChange={(val: string) => {
                    setValue(`relocationLocations.${index}`, val, {
                      shouldValidate: true,
                    });
                  }}
                  forbiddenLocation={[
                    mainLocation,
                    ...relocationLocations.filter(
                      (_: any, i: number) => i !== index,
                    ),
                  ]}
                  onDelete={() => {
                    if (fields.length > 1) {
                      remove(index);
                    } else {
                      setValue(`relocationLocations.${index}`, "");
                    }
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => append("")}
              className="mt-4 flex flex-row gap-2 items-center outline-none cursor-pointer
                max-sm:pt-2
              "
            >
              <span className="flex flex-row items-center gap-2">
                <Plus
                  className="text-white bg-blue-600 rounded-full p-0.5"
                  size={20}
                />
              </span>
              <span className="text-blue-600 font-medium text-md">
                Add city
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
