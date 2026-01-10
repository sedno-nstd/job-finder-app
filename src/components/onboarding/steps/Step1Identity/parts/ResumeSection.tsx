import { FileText, Paperclip, Trash } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function ResumeSection() {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useFormContext();
  const noResumeChecked = watch("noResume");
  const resumeFile = watch("resumeUrl");
  const file = resumeFile?.[0];
  const handleClearFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setValue("resumeUrl", null);
    trigger("resumeUrl");
  };

  return (
    <div>
      <div
        className={`flex flex-col gap-1 mb-1 ${
          noResumeChecked ? "opacity-40" : ""
        }`}
      >
        <label className="font-medium mb-2">Resume (PDF)</label>

        <input
          id="resume-input"
          type="file"
          accept=".pdf"
          className="hidden"
          {...register("resumeUrl", {
            onChange: () => trigger(""),
          })}
          disabled={noResumeChecked}
        />

        <label
          htmlFor="resume-input"
          className=" flex items-center justify-between border border-[#6380a64d] p-4 rounded-xl cursor-pointer transition-all bg-white"
        >
          {file ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="bg-[#e9f3fe] text-blue-600 p-3 rounded-lg">
                  <FileText size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-md font-semibold truncate max-w-[180px] text-blue-600">
                    {file.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </span>
                </div>
              </div>
              <button
                onClick={handleClearFile}
                className="p-3 hover:bg-[#6380a61a] text-[#2d3540] hover:text-black rounded-lg transition-colors duration-200"
              >
                <Trash size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="bg-gray-200 p-2 rounded-lg text-gray-500">
                <Paperclip size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-md font-semibold">Upload resume</span>
                <span className="text-sm text-gray-500">
                  Up to 5 MB • PDF only
                </span>
              </div>
            </div>
          )}
        </label>

        {errors.resumeFile && (
          <span className="text-red-500 text-xs mt-1">
            {String(errors.resumeFile.message)}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 mb-2 mt-3">
        <input
          type="checkbox"
          id="noResume"
          className="w-[18px] h-[18px] cursor-pointer accent-blue-600 duration-200 transition-all"
          {...register("noResume", {
            onChange: () => trigger("resumeUrl"),
          })}
        />
        <label
          htmlFor="noResume"
          className="text-sm cursor-pointer select-none"
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
