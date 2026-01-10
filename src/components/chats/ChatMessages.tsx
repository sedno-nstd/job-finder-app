"use client";

import clsx from "clsx";

interface Message {
  id: string;
  text: string;
  authorId: string;
}

export function ChatMessages({
  messages,
  myId,
}: {
  messages: Message[];
  myId: string;
}) {
  return (
    <div className="flex-1 overflow-y-auto py-4 pl-4 pr-2 flex flex-col gap-2 custom-scrollbar">
      {messages.map((m) => {
        const isMe = m.authorId === myId;
        return (
          <div
            key={m.id}
            className={clsx(
              "w-full flex",
              isMe ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={clsx(
                "px-4 py-2 rounded-2xl text-sm max-w-[50%] break-words",
                isMe
                  ? "bg-blue-600 text-white rounded-tr-none"
                  : "bg-white border text-black rounded-tl-none"
              )}
            >
              {m.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
