"use client";
import { createMessage } from "@/src/actions/common/chat";
import { useState } from "react";

interface Props {
  myRole: string;
  chatId: string;
  myId: string;
}

export function ChatInput({ chatId, myId, myRole }: Props) {
  const [messageValue, setMssageValue] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (messageValue.trim() === "") return;

    const currentText = messageValue;
    setMssageValue("");

    await createMessage(
      chatId,
      myId,
      currentText,
      myRole as "employer" | "applicant",
    );
  };

  return (
    <form
      className="p-4 border-t border-[#6380a61a] bg-white"
      onClick={handleSubmit}
    >
      <div className="flex items-center gap-2 bg-[#f4f4f5] rounded-xl px-4 py-2 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
        <input
          type="text"
          value={messageValue}
          onChange={(e) => setMssageValue(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-sm py-1 text-black placeholder:text-gray-400"
          placeholder="Write the message..."
        />
        <button
          className="text-blue-600 hover:text-blue-700 font-medium text-sm px-2 cursor-pointer"
          type="submit"
        >
          Sent
        </button>
      </div>
    </form>
  );
}
