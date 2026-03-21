import { TFunction } from "i18next";
import { Search, X } from "lucide-react";

interface Props {
  openModal: boolean;
  setisOpen: (val: boolean) => void;
  SearchFields: (val: boolean) => React.ReactNode;
  t: TFunction;
}
export function SearchResponsive({
  SearchFields,
  openModal,
  setisOpen,
  t,
}: Props) {
  return (
    <>
      <div className="max-xl:hidden w-full">{SearchFields(false)}</div>
      <div
        className="xl:hidden max-xl:max-w-[640px] flex items-center bg-[#6380a61a] p-3 rounded-lg w-full"
        onClick={() => setisOpen(true)}
      >
        <Search className="text-gray-400 mr-2" />
        <span className="text-gray-400">{t("placeholder")}</span>
      </div>
      {openModal && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col xl:hidden">
          <div className="flex items-center p-4">
            <button onClick={() => setisOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">{SearchFields(true)}</div>
        </div>
      )}
    </>
  );
}
