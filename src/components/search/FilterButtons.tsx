import { useSearchStore } from "@/src/store/useSearchStore";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

const navItem = [
  { name: "region", label: "Add region", showonAllWidth: false },
  { name: "date", label: "Date of Publish", showonAllWidth: true },
  { name: "type", label: "Type of employment", showonAllWidth: true },
  { name: "expierence", label: "Job expierence", showonAllWidth: true },
  { name: "location", label: "Location", showonAllWidth: true },
  { name: "salary", label: "Salary", showonAllWidth: true },
];

interface Props {
  openModal: boolean;
  setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function FilterButtons({ openModal, setisOpen }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxVisible = 4;
  const [isMobile, setIsMobile] = useState(false);

  const itemsToRender = isMobile
    ? navItem.slice(currentIndex, currentIndex + maxVisible)
    : navItem;

  const { showSideBar, setShowSideBar } = useSearchStore();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1280);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-row overflow-hidden relative gap-2 mt-3">
      {isMobile && currentIndex > 0 && (
        <div className="absolute left-0 top-0 bottom-0 z-10 w-12 flex items-center bg-gradient-to-r from-[#eff2f6] to-transparent pointer-events-none">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="p-1 bg-white rounded-full shadow-md pointer-events-auto hover:text-blue-600 transition-all"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      )}
      {itemsToRender.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            if (item.name === "region") {
              setisOpen(() => openModal === true);
            } else {
              setShowSideBar(!showSideBar);
            }
          }}
          className={clsx(
            "bg-white relative  py-2 px-5 h-auto text-nowrap border-[1px] border-transparent rounded-2xl hover:text-blue-600 cursor-pointer hover:border hover:border-blue-600",
            !item.showonAllWidth && "xl:hidden",
            "shrink-0",
          )}
        >
          <span>{item.label}</span>
        </div>
      ))}
      {isMobile && currentIndex + maxVisible < navItem.length && (
        <div className="absolute right-0 top-0 bottom-0 z-10 w-12 flex items-center justify-end bg-gradient-to-l from-[#eff2f6] to-transparent pointer-events-none">
          <button
            onClick={() =>
              setCurrentIndex((prev) =>
                Math.min(navItem.length - maxVisible, prev + 1),
              )
            }
            className="p-1 bg-white rounded-full shadow-md pointer-events-auto hover:text-blue-600 transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
