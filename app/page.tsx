import Image from "next/image";
import { SearchInput } from "./search/Ui/SearchInput";
import { LeftColumn } from "./search/Ui/LeftColumn/LeftColumn";

export default function Home() {
  return (
    <div className="flex w-100% min-h-screen font-sans justify-center relative bg-[#eff2f6] ">
      <div className="max-w-[1280px] flex flex-row">
        <LeftColumn />
        <SearchInput />
      </div>
    </div>
  );
}
