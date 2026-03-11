"use client";
import { Loader2, Mic } from "lucide-react";
import { useSpeechToText } from "@/src/hooks/user/useSpeechToText";
import clsx from "clsx";

interface VoiceTextAreaProps {
  value: string;
  onChange: (val: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  placeHolderClasses?: string;
}

export function VoiceTextArea({
  value,
  onChange,
  label,
  placeholder,
  className,
  placeHolderClasses,
}: VoiceTextAreaProps) {
  const { isListening, startListening } = useSpeechToText("en-US");

  const handleVoiceAppend = () => {
    startListening((transcript) => {
      onChange(`${value} ${transcript}`.trim());
    });
  };

  return (
    <div className={clsx("flex flex-col w-full", className)}>
      {label && (
        <label
          className={clsx("mb-4 max-w-[400px] text-wrap", placeHolderClasses)}
        >
          {label}
        </label>
      )}
      <div className="w-full relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="border border-[#5a6f87] h-[150px] px-2 pt-2 pb-10 w-full resize-none outline-none overflow-hidden focus:border-blue-600 transition-colors"
        />
        <div
          onClick={handleVoiceAppend}
          className={`absolute left-2 bottom-2 flex flex-row gap-2 items-center cursor-pointer transition-opacity ${
            isListening ? "opacity-50 pointer-events-none" : "hover:opacity-80"
          }`}
        >
          {isListening ? (
            <Loader2 size={18} className="text-blue-600 animate-spin" />
          ) : (
            <Mic size={18} className="text-blue-600" />
          )}
          <span className="text-lg text-blue-600 font-medium">
            {isListening ? "Listening..." : "Append voice"}
          </span>
        </div>
      </div>
    </div>
  );
}
