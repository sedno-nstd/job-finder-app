import clsx from "clsx";

interface Props {
  prevStep: () => void;
  isValid: boolean;
}

export function Step2Nvaigation({ isValid, prevStep }: Props) {
  return (
    <div
      className="flex flex-row pt-4 justify-center gap-1 
                max-sm:mt-2
              "
    >
      <button
        type="button"
        className="w-1/2 cursor-pointer bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-lg py-2 transition-all font-medium
                max-sm:hidden 
                "
        onClick={() => prevStep()}
      >
        Back
      </button>
      <button
        type="submit"
        className={clsx(
          "bg-blue-600 w-1/2  hover:bg-blue-700 duration-200 cursor-pointer transition-all text-white border  hover:text-white/90 rounded-lg py-2 px-6 max-sm:w-full",
          !isValid && "opacity-50 cursor-not-allowed",
        )}
      >
        Continue
      </button>
    </div>
  );
}
