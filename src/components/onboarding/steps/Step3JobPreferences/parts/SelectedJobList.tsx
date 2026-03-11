import clsx from "clsx";
import { selectButtons } from "../../../helpers/helper";
import { X } from "lucide-react";

interface Props {
  joobs: string[];
  selectProfession: (v: string) => void;
  sentinelRef: React.RefObject<HTMLDivElement | null>;
}

export function SelectedJobList({
  joobs,
  selectProfession,
  sentinelRef,
}: Props) {
  return (
    <>
      {joobs.length > 0 && (
        <div
          className={clsx(
            "w-full flex-wrap flex shrink-0",
            joobs.length > 1 && "min-h-[40px]",
          )}
        >
          {joobs.map((job, index) => {
            const isSelected = joobs.includes(job);
            return (
              <div className="mt-2 ml-2 md:text-center" key={index}>
                <button
                  className={clsx(
                    "sm:text-sm max-sm:text-sm",
                    selectButtons(isSelected),
                  )}
                  type="button"
                  onClick={() => selectProfession(job)}
                >
                  {job} <X size={18} className="text-blue-700" />
                </button>
              </div>
            );
          })}
          <div
            className="w-full h-[1px]  mt-6 mb-3 bg-[#6380A64D]"
            ref={sentinelRef}
          ></div>
        </div>
      )}
    </>
  );
}
