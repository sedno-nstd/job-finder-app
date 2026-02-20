import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  label?: any;
  className?: string;
  onSubmit?: (e?: any) => Promise<void> | void;
  labelClassName?: string;
}

export function FormWrapper({
  children,
  label,
  className,
  onSubmit,
  labelClassName,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      action=""
      className={clsx("shadow-lg pt-6 flex flex-col w-full", className)}
    >
      <h1
        className={clsx(
          "text-3xl text-main font-bold mb-4 max-w-[400px] text-wrap",
          labelClassName,
        )}
      >
        {label}
      </h1>
      <div className="w-full">{children}</div>
    </form>
  );
}
