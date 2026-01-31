"use client";
import { useFormContext } from "react-hook-form";
import { SelectUserLocation } from "../../../shared/SelectUserLocation/index";
import { Step2Values } from "../../../schemas/schemas";

export function LocationSection() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<Step2Values>();

  const location = watch("location");
  const targetLocations = watch("relocationLocations");

  return (
    <div className="mb-5">
      <div className="mb-2">
        <label htmlFor="" className="mb-2 font-semibold cursor-text">
          Search location (City/Remote/Abroad)
        </label>
      </div>
      <div className=" h-full flex outline-none flex-col">
        <div>
          <SelectUserLocation
            registerName="location"
            forbiddenLocation={targetLocations}
            onChange={(val) =>
              setValue("location", val, { shouldValidate: true })
            }
            value={location}
          />
        </div>
        {errors.location && (
          <span
            className="text-red-500 text-sm mt-2 animate-in fade-in duration-300
          max-sm:text-base
          "
          >
            Please select your location to continue
          </span>
        )}
      </div>
    </div>
  );
}
