"use client";
import React, { useEffect } from "react";
import { X } from "lucide-react";

import clsx from "clsx";
import { JoobleLogo } from "@/public/images/userHeader/logo";

interface inputModallProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export function InputModal({
  isOpen,
  onClose,
  children,
  className,
}: inputModallProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-white w-full h-screen overflow-y-auto">
      <div className="flex flex-col w-full max-w-[1280px] mx-auto min-h-full p-4">
        <div className="flex items-center justify-between w-full h-[60px] shrink-0">
          <JoobleLogo height={32} />

          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
          >
            <X size={28} className="text-[#2d3540]" />
          </button>
        </div>
        <div
          className={clsx(
            "flex flex-col items-start justify-start mt-[10vh] w-full px-2",
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
