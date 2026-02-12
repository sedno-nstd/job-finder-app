import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  label: any;
  className?: string;
  onSubmit?: (e?: any) => Promise<void> | void;
}

export function FormWrapper({ children, label, className, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      action=""
      className={clsx(
        "shadow-lg pt-6 rounded-lg flex flex-col w-full",
        className,
      )}
    >
      <h1 className="text-3xl pl-6 text-main font-bold mb-4 max-w-[400px] text-wrap">
        {label}
      </h1>
      <div className="w-full">{children}</div>
    </form>
  );
}
