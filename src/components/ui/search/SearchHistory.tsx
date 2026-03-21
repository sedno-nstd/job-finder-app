import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface Idata {
  profession?: string;
  region?: string;
}

interface Props {
  className?: string;
  setQuery: (item: Idata) => void;
  data: Idata[];
  isOpen: boolean;
  isShowOptions: boolean;
  clear: () => void;
}

export function SearchHistory({
  data,
  className,
  setQuery,
  isOpen,
  isShowOptions,
  clear,
}: Props) {
  const { t, ready } = useTranslation("profile/search");
  return (
    <div>
      {isOpen && isShowOptions && (
        <div
          className={clsx(
            "absolute mt-1 top-full flex-col border-[0.5px] border-gray-200 w-full flex items-center bg-white shadow-2xl",
            className,
          )}
        >
          <div className="w-full flex justify-between px-3 py-1">
            <span className="text-xs text-[#a1afc1] font-medium">
              {t("recently")}
            </span>
            <button
              onClick={(e) => {
                (e.preventDefault(), clear());
              }}
              className="text-sm text-blue-600 cursor-pointer font-medium"
            >
              {t("clear")}
            </button>
          </div>
          {data.map((item, index) => {
            return (
              <div
                className="hover:bg-[#E9F3FE80] px-3 py-1 w-full cursor-pointer"
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setQuery(item);
                }}
              >
                <p className="font-normal text-sm leading-5 font-sans">
                  <span>{item.profession ?? t("searchDefaultWords")}</span> -
                  <span className="text-[#a1afc1]">{item.region ?? ""}</span>
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
