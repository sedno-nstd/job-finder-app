interface OptionsProps {
  showSideBar: boolean;
  setShowSidebar: (prevState: boolean) => void;
}

const navItem = [
  { name: "date", label: "Date of Publish" },
  { name: "type", label: "Type of employment" },
  { name: "expierence", label: "Job expierence" },
  { name: "location", label: "Location" },
  { name: "salary", label: "Salary" },
];

export function FilterButtons({ showSideBar, setShowSidebar }: OptionsProps) {
  return (
    <div className="flex flex-row gap-2">
      {navItem.map((item, index) => (
        <button
          key={index}
          onClick={() => setShowSidebar(!showSideBar)}
          className="bg-white py-2 px-5 h-[42px] w-[] rounded-2xl hover:text-blue-600 cursor-pointer hover:border hover:border-blue-600 "
        >
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}
