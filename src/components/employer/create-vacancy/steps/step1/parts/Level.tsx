import { JOB_LEVELS } from "@/src/config/searchOptions";
import clsx from "clsx";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

type jobLevel = (typeof JOB_LEVELS)[keyof typeof JOB_LEVELS];

interface Props {
  name: string;
}

export function LevelField({ name }: Props) {
  const [level, setLevel] = useState<jobLevel[]>([]);
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleSelect = (value: jobLevel) => {
    const isSelected = level.some((item) => item === value);

    const nextLevel = isSelected
      ? level.filter((item) => item !== value)
      : [...level, value];

    setLevel(nextLevel);
    setValue(name, nextLevel, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-row">
        {JOB_LEVELS.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSelect(item)}
            className="cursor-pointer gap-3 flex flex-row items-center"
          >
            <div
              className={clsx(
                "rounded-full h-[16px] w-[16px] border border-blue-600",
                level.some((j) => j === item) ? "bg-blue-600" : "",
              )}
            ></div>
            <span className="mr-3">{item}</span>
          </div>
        ))}
      </div>
      {errors.level && (
        <p className="text-red-500 text-xs">{String(errors.level.message)}</p>
      )}
    </div>
  );
}
