"use client";
import { AlertCircle, RefreshCw } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ErrorBlockProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorBlock({
  message = "Something went wrong",
  onRetry,
  className,
}: ErrorBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[400px] w-full p-8 text-center",
        className,
      )}
    >
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6 border border-red-100">
        <AlertCircle size={40} className="text-red-500" />
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h2>
      <p className="text-slate-500 max-w-[300px] mb-8">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-full transition-all font-medium"
        >
          <RefreshCw size={18} />
          Try again
        </button>
      )}
    </div>
  );
}
