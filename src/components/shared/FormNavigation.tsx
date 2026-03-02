import clsx from "clsx";

interface Props {
  variant: "registration" | "update";
  onBack?: () => void;
  onSubmit?: () => void;
  isError?: boolean;
  firstButtonClasses?: string;
  secondButtonClasses?: string;
  buttonText?: string;
  isSubmitting?: boolean;
}

export function FormNavigation({
  variant,
  firstButtonClasses,
  secondButtonClasses,
  isError,
  buttonText = "Save",
  onBack,
  isSubmitting,
  onSubmit,
}: Props) {
  const getLabel = () => {
    if (isSubmitting) return "Uploading...";
    if (isError) return "Error! Try again";
    return buttonText;
  };

  const currentLabel = getLabel();

  if (variant === "registration") {
    return (
      <div
        className={clsx(
          "flex flex-row justify-center w-full pt-4 gap-1",
          "max-sm:mt-2",
          firstButtonClasses,
        )}
      >
        <button
          type="button"
          className="flex-1 duration-200 cursor-pointer bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-lg py-2 transition-all font-medium
                        max-sm:hidden 
                        "
          onClick={() => onBack && onBack()}
        >
          Back
        </button>
        <button
          type={onSubmit ? "button" : "submit"}
          onClick={() => onSubmit && onSubmit()}
          className={clsx(
            "bg-blue-600 flex-1 hover:bg-blue-700 duration-200 cursor-pointer transition-all text-white border  hover:text-white/90 rounded-lg py-2 px-6 max-sm:w-full",
          )}
        >
          {currentLabel}
        </button>
      </div>
    );
  }
  return (
    <div className="w-full flex justify-center">
      <button
        type={onSubmit ? "button" : "submit"}
        onClick={() => onSubmit && onSubmit()}
        disabled={isSubmitting}
        className={clsx(
          "cursor-pointer w-full bg-blue-600 h-[40px] hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg transition-all font-medium",
          secondButtonClasses ? secondButtonClasses : "w-full py-2",
        )}
      >
        {currentLabel}
      </button>
    </div>
  );
}
