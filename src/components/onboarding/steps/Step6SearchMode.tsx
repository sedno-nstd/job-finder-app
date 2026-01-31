import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { SEARCH_VACANCY_TYPE } from "../constants/jobOptions";
import { useState } from "react";
import clsx from "clsx";
import { ArrowLeft, Check } from "lucide-react";
import { step6Schema, step6Values } from "../schemas/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function Step6SearchMode() {
  const { prevStep, formData, updatedFields } = useOnboardingStore();
  const [selected, setSelected] = useState<string>(
    formData.onBoarding.searchMode || "",
  );
  const [error, setError] = useState<boolean | null>(null);

  const methods = useForm<step6Values>({
    mode: "onChange",
    resolver: zodResolver(step6Schema),
  });

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="relative flex flex-col max-w-[448px] text-main py-8 px-6 rounded-lg bg-white">
        <button
          type="button"
          className="
            cursor-pointer absolute
            max-sm:top-6 max-sm:left-6 
            sm:top-3 sm:left-3
            "
          onClick={() => prevStep()}
        >
          <ArrowLeft size={26} className="text-blue-600" />
        </button>
        <label className="text-2xl font-bold cursor-text mb-5 pt-4">
          Select searc vacancy type
        </label>
        <div className="flex flex-col gap-4 items-start mb-8">
          {SEARCH_VACANCY_TYPE.map((item) => {
            const newId = item.id;
            const currentMode = selected === item.id;
            return (
              <div
                className={clsx(
                  "flex items-start p-4 rounded-lg w-full h-full outline-none",
                  currentMode
                    ? "ring-blue-600 ring-2"
                    : "ring ring-input-border",
                )}
                onClick={() => {
                  setSelected(newId);
                  updatedFields("onBoarding", {
                    searchMode: newId,
                  });
                }}
                key={item.id}
              >
                <button className="w-full h-full text-left flex flex-row justify-center items-center gap-5">
                  <div>
                    <span className="text-lg font-semibold">{item.name}</span>
                    <p className="text-sm">{item.description}</p>
                  </div>
                  <div
                    className={clsx(
                      "p-1 h-5 w-5 rounded-full flex items-center justify-center",
                      currentMode ? "bg-blue-500" : "border border-secondary",
                    )}
                  >
                    {currentMode && (
                      <Check size={12} className="text-white" strokeWidth={4} />
                    )}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      </div>
    </div>
  );
}
