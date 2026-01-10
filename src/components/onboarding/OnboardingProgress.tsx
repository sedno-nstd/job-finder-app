import clsx from "clsx";

export function OnboardingProgress({ step }: { step: number }) {
  return (
    <div className="flex w-full gap-2 px-6 pt-4 mb-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            "duration-200 transition-all rounded-l-lg rounded-r-lg border border-secondary",
            i < step ? "bg-blue-600" : "bg-gray-200"
          )}
        ></div>
      ))}
    </div>
  );
}
