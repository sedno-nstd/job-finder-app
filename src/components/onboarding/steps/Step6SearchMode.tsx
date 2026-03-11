"use client";
import { useOnboardingStore } from "@/src/store/useOnboardingStore";
import { SEARCH_VACANCY_TYPE } from "../constants/jobOptions";
import { useState } from "react";
import clsx from "clsx";
import { FormWrapper } from "../../shared/FormWrapper";
import { Check } from "lucide-react";

export function Step6SearchMode() {
  const { formData, updatedFields } = useOnboardingStore();
  const [selected, setSelected] = useState<string>(
    formData.onBoarding.searchMode || "",
  );

  return (
    <FormWrapper
      className="w-full h-full flex justify-center items-start"
      as="form"
    >
      <div className="relative flex flex-col max-w-[448px] text-main pt-8 px-6 rounded-lg bg-white">
        <label className="text-2xl font-bold cursor-text mb-5 pt-4">
          Select search vacancy type
        </label>
        <div className="flex flex-col gap-4 items-start mb-8">
          {SEARCH_VACANCY_TYPE.map((item) => {
            const newId = item.id;
            const currentMode = selected === item.id;
            return (
              <div
                className={clsx(
                  "flex items-center p-4 rounded-lg justify-between cursor-pointer w-full h-full outline-none",
                  currentMode
                    ? "ring-blue-600 ring-2"
                    : "ring ring-input-border",
                )}
                key={item.id}
                onClick={(e) => {
                  setSelected(newId);
                  e.stopPropagation();
                  updatedFields("onBoarding", {
                    searchMode: newId,
                  });
                }}
              >
                <div>
                  <span className="text-lg font-semibold">{item.name}</span>
                  <p className="text-sm max-w-[325px] text-wrap">
                    {item.description}
                  </p>
                </div>
                <div
                  className={clsx(
                    "p-1 h-5 w-5 shrink-0 rounded-full flex items-center border justify-center",
                    currentMode
                      ? "bg-blue-500 border border-blue-500"
                      : "border border-secondary",
                  )}
                >
                  {currentMode && (
                    <Check size={10} className="text-white" strokeWidth={4} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </FormWrapper>
  );
}
