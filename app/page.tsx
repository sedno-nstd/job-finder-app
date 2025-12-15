import Image from "next/image";
import { SearchInput } from "./search/Ui/SearchInput";

export default function Home() {
  return (
    <div className="flex w-100% min-h-screen font-sans justify-center bg-[#eff2f6] ">
      <SearchInput />
    </div>
  );
}
