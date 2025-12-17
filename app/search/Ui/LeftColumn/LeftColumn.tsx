import { NAV_ITEMS } from "./NavItem";

export function LeftColumn() {
  return (
    <div className="flex flex-col p-6 max-w-[300px]">
      <div></div>
      <div className="p-[16px] bg-white flex flex-col">
        <span className="mb-[12px] text-sm text-[#5a6f87]">
          Employers will see you in our database and will be able to offer you
          jobs themselves.
        </span>
        <div className="flex flex-col gap-[6px] text-lg font-medium">
          <button className="rounded-lg py-[6px] px-[16px] bg-blue-700 hover:bg-blue-800 text-white cursor-pointer duration-200 transition-all">
            Create profile
          </button>
          <button className="rounded-lg py-[6px] px-[16px] text-blue-600 hover:text-white border-[1px] border-blue-600/30 bg-white hover:bg-blue-600 cursor-pointer duration-200 transition-all">
            Enter
          </button>
          <button className="rounded-lg py-[6px] px-[16px] text-blue-600 hover:bg-blue-600/5 cursor-pointer">
            Post a Job
          </button>
        </div>
      </div>
      <div className="h-[1px] my-2 mx-4  bg-black/5"></div>
      <div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              className="py-3 px-4 flex items-center justify-start hover:bg-[#6380A61A] rounded-lg cursor-pointer"
              key={item.name}
            >
              <div className="flex flex-row gap-2">
                <span className="text-blue-600">
                  {" "}
                  <Icon size={22} />
                </span>
                <span className="text-[#2d3540]">{item.label}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-[1px] my-2 mx-4  bg-black/5"></div>
    </div>
  );
}
