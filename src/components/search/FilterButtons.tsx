import { useSearchStore } from "@/src/store/useSearchStore";

const navItem = [
  { name: "date", label: "Date of Publish" },
  { name: "type", label: "Type of employment" },
  { name: "expierence", label: "Job expierence" },
  { name: "location", label: "Location" },
  { name: "salary", label: "Salary" },
];

export function FilterButtons() {
  const { showSideBar, setShowSideBar } = useSearchStore();
  return (
    <div className="flex flex-row gap-2 mt-3">
      {navItem.map((item, index) => (
        <button
          key={index}
          onClick={() => setShowSideBar(!showSideBar)}
          className="bg-white py-2 px-5 h-[42px] border-[1px] border-transparent rounded-2xl hover:text-blue-600 cursor-pointer hover:border hover:border-blue-600 "
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
