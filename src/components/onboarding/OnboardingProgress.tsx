import clsx from "clsx";

export function OnboardingProgress({ step }: { step: number }) {
  return (
    <div className="w-full flex flex-col items-center gap-2 px-4 py-6">
      <div className="flex justify-between w-full max-w-[200px] items-center mb-1">
        <span className="text-[14px] uppercase tracking-wider text-blue-500 font-bold">
          Step {step}
        </span>
        <span className="text-[14px] text-gray-400">
          {Math.round((step / 6) * 100)}%
        </span>
      </div>
      <div className="flex flex-row w-full max-w-[200px] gap-1.5">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              "h-1 flex-1 transition-all duration-500 rounded-full",
              i < step ? "bg-blue-600" : "bg-gray-200",
            )}
          />
        ))}
      </div>
    </div>
  );
}
