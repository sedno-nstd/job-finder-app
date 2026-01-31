import { PencilIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  title: string;
  information?: string | null | string[];
  step: number;
  href: string;
}

export function BasicProfileCard({ information, title, step, href }: Props) {
  const renderInformation = Array.isArray(information)
    ? information.filter(Boolean).join(", ")
    : information;

  return (
    <div className="flex flex-col justify-between gap-3 p-6 text-main rounded-lg bg-white w-full">
      <div className="flex flex-col">
        <h1 className="text-2xl mb-2 font-semibold max-w-[276] text-wrap">
          {title}
        </h1>
        <span className="text-sm leading-5 max-w-[400px] text-wrap">
          {renderInformation}
        </span>
      </div>

      <div>
        <Link
          href={`${href}`}
          className="text-blue-600 hover:text-blue-700 flex items-center gap-2 font-semibold text-sm transition-colors"
        >
          <PencilIcon size={16} />
          <span className="font-medium">Edit</span>
        </Link>
      </div>
    </div>
  );
}
