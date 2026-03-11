import clsx from "clsx";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  classname?: string;
  description: string;
  href1: string;
  href2: string;
}

export function ExperienceCard({
  description,
  href1,
  href2,
  title,
  classname,
}: Props) {
  return (
    <div className={clsx("w-full h-full flex flex-col", classname)}>
      <div className="w-full h-full flex flex-col border-b border-gray-300 mb-2">
        <h1 className="text-2xl mb-2 font-semibold max-w-[276] text-wrap">
          {title}
        </h1>
        <p className="text-md">{description}</p>
        <Link
          href={href1}
          className="text-blue-600 flex items-center mb-2 gap-2 mt-4 hover:opacity-80 transition-opacity w-fit"
        >
          <Pencil size={18} />
          <span className="font-medium text-sm">Edit</span>
        </Link>
      </div>
      <Link
        href={href2}
        className="text-blue-600 flex items-center gap-2 hover:opacity-80 transition-opacity w-fit"
      >
        <Plus size={20} />
        <span className="font-medium text-sm">Add to worked place</span>
      </Link>
    </div>
  );
}
