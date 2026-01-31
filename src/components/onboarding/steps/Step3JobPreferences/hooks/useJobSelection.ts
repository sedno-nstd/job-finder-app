import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function useJobSelection(initialJobs: string[]) {
  const { setValue } = useFormContext();
  const [query, setQuery] = useState("");
  const [joobs, setJoobs] = useState<string[]>(initialJobs);

  const selectProfession = (value: string) => {
    const isSelected = joobs.includes(value);
    let updatedJobs = [...joobs];
    if (!isSelected) {
      if (joobs.length >= 20) return;

      updatedJobs.push(value);
    } else {
      updatedJobs = joobs.filter((item) => item !== value);
    }
    setJoobs(updatedJobs);
    setValue("desiredJob", updatedJobs, { shouldValidate: true });
  };

  return { joobs, selectProfession, query, setQuery };
}
