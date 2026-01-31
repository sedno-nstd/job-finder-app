import clsx from "clsx";
import { useFormContext } from "react-hook-form";

export function NoResumeCheckBox() {
  const {
    register,
    trigger,
    formState: { errors },
    watch,
  } = useFormContext();

  const resumeFile = watch("resumeUrl");

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center gap-2 mb-2 mt-4 ml-1">
        <input
          type="checkbox"
          id="noResume"
          disabled={!!resumeFile}
          className="w-[18px] h-[18px] cursor-pointer accent-blue-600 disabled:cursor-not-allowed disabled:opacity-50 duration-200 transition-all"
          {...register("noResume", {
            onChange: () => trigger("resumeUrl"),
          })}
        />
        <label
          htmlFor="noResume"
          className={clsx(
            "text-sm select-none transition-colors duration-200",
            resumeFile
              ? "text-gray-400 cursor-not-allowed"
              : "text-slate-600 cursor-pointer hover:text-blue-600",
          )}
        >
          I don't have a resume, continue without it
        </label>
      </div>
      {errors.noResume && (
        <span className="text-red-500">{String(errors.noResume)}</span>
      )}
    </div>
  );
}
