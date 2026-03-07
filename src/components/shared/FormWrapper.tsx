import clsx from "clsx";
import { ArrowLeft } from "lucide-react";

interface Props {
  children: React.ReactNode;
  label?: string;
  className?: string;
  onSubmit?: (e?: any) => Promise<void> | void;
  labelClassName?: string;
  onBack?: () => void;
  onClick?: () => void;
  id?: string;
  as?: "form" | "div";
}

export function FormWrapper({
  children,
  label,
  className,
  onSubmit,
  labelClassName,
  onBack,
  id,
  as = "div",
  onClick,
}: Props) {
  const Component = as;
  return (
    <Component
      onClick={as === "div" ? onClick : undefined}
      onSubmit={as === "form" ? onSubmit : undefined}
      {...(as === "form" ? { action: "" } : {})}
      id={id}
      className={clsx(
        "flex flex-col w-full bg-white relative px-6",
        "sm:rounded-lg  sm:h-full",
        "max-sm:shadow-none max-sm:rounded-none max-sm:my-8",
        className,
      )}
    >
      {onBack && (
        <button
          type="button"
          className="absolute cursor-pointer text-blue-600 top-2 left-4 md:hidden  sm:hidden"
          onClick={onBack}
        >
          <span className="flex flex-row items-center gap-1">
            <ArrowLeft size={20} />
            Back
          </span>
        </button>
      )}
      {label && (
        <h1
          className={clsx(
            "text-3xl text-main font-bold mb-4 max-w-[400px] text-wrap",
            labelClassName,
          )}
        >
          {label}
        </h1>
      )}
      <div className="w-full">{children}</div>
    </Component>
  );
}
