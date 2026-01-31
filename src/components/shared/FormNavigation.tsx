import clsx from "clsx";

interface Props {
  variant: "registration" | "update";
  onBack?: () => void;
  firstButtonClasses?: string;
  secondButtonClasses?: string;
  buttonText?: string;
  isSubmitting?: boolean;
}

export function FormNavigation({
  variant,
  firstButtonClasses,
  secondButtonClasses,
  buttonText = "Save",
  onBack,
  isSubmitting,
}: Props) {
  if (variant === "registration") {
    return (
      <div
        className={clsx(
          "flex flex-row pt-4 justify-center gap-1",
          "max-sm:mt-2",
          firstButtonClasses,
        )}
      >
        <button
          type="button"
          className="w-1/2 cursor-pointer bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-lg py-2 transition-all font-medium
                        max-sm:hidden 
                        "
          onClick={() => onBack && onBack()}
        >
          Back
        </button>
        <button
          type="submit"
          className={clsx(
            "bg-blue-600 w-1/2  hover:bg-blue-700 duration-200 cursor-pointer transition-all text-white border  hover:text-white/90 rounded-lg py-2 px-6 max-sm:w-full",
          )}
        >
          Continue
        </button>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center">
      <button
        type="submit"
        disabled={isSubmitting}
        className={clsx(
          "cursor-pointer w-full bg-blue-600 h-[40px] hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg transition-all font-medium",
          secondButtonClasses ? secondButtonClasses : "w-full py-2",
        )}
      >
        {isSubmitting ? "Saving..." : buttonText}
      </button>
    </div>
  );
}
