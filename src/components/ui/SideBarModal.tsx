"use client";
import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function FullScreenModal({
  isOpen,
  onClose,
  children,
  title,
  className,
}: Props) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={clsx("fixed inset-0 z-50 bg-white flex flex-col", className)}
    >
      <div className="flex items-center justify-between p-4">
        <span className="font-semibold text-lg">{title}</span>
        <button
          onClick={onClose}
          className="p-2 w-fit bg-gray-100 rounded-full hover:bg-gray-200"
        >
          <X size={24} />
        </button>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}
