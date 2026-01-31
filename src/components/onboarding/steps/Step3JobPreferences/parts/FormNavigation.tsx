interface Props {
  joobs: string[];
  prevStep: () => void;
  isValid: boolean;
}

export function FormNavigation({ isValid, joobs, prevStep }: Props) {
  return (
    <div className="mt-auto sticky bottom-0 z-10 px-4 py-4 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
      {joobs.length <= 0 ? (
        <div
          className="flex flex-row justify-between gap-3 w-full
        
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
            className="w-1/2 cursor-not-allowed  font-bold text-[16px] leading-[24px] font-sans text-white h-[40px] rounded-lg bg-[#6380a64d]
            max-sm:w-full 
            "
            type="button"
          >
            Please select a profession
          </button>
        </div>
      ) : (
        <div className="flex flex-row justify-between gap-3">
          <button
            type="button"
            className="w-1/2 cursor-pointer bg-white border border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-lg py-2 transition-all font-medium"
            onClick={() => prevStep()}
          >
            Back
          </button>
          <button
            disabled={!isValid}
            type="submit"
            className="w-1/2 cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-lg py-2 transition-all font-medium"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
