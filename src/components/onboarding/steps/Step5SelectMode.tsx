"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { EMPLOYMENT_TYPES } from "../constants/jobOptions";
import { useState } from "react";
import { step5Values } from "../schemas/schemas";
import { ArrowLeft } from "lucide-react";

export function Step5SelectMode() {
  const { updatedFields, formData, nextStep, prevStep } = useOnboardingStore();
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(formData.onBoarding.employmentType)
      ? formData.onBoarding.employmentType
      : [],
  );
  const [error, setError] = useState<string | null>(null);

  const toggleOption = (id: string) => {
    setError(null);
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleContinue = () => {
    const result = step5Values.safeParse(selected);

    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    updatedFields("onBoarding", { employmentType: selected });
    nextStep();
  };

  return (
    <div className="w-full h-full flex items-center text-main justify-center">
      <div className="relative flex flex-col gap-5 w-full max-w-[448px] bg-white rounded-lg px-6 py-8">
        <button
          type="button"
          className="
            cursor-pointer absolute
            max-sm:top-6 max-sm:left-6 
            sm:top-3 sm:left-2
            "
          onClick={() => prevStep()}
        >
          <ArrowLeft size={26} className="text-blue-600" />
        </button>
        <label className="text-2xl  font-bold cursor-text pt-3">
          Your wishes regarding <br /> employment
        </label>
        {EMPLOYMENT_TYPES.map((item) => (
          <div
            className="flex flex-row gap-4"
            key={item.id}
            onClick={() => toggleOption(item.id)}
          >
            <input
              type="checkbox"
              checked={selected.includes(item.id)}
              readOnly
              className="w-[22px] h-[22px] cursor-pointer border-secondary accent-blue-600"
            />
            <span>{item.label}</span>
          </div>
        ))}
        {error && (
          <p className="text-red-500 text-sm font-medium animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}
        <div className="w-full">
          <button
            type="submit"
            onClick={handleContinue}
            className="flex-1 w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg py-2 transition-all font-medium"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
