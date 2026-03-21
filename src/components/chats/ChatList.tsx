"use client";
import { Chat } from "@/src/types/chat";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface ChatListProps {
  chats: Chat[];
  userId: string;
}

export function ChatList({ chats, userId }: ChatListProps) {
  const searchParams = useSearchParams();
  const activeId = searchParams.get("id");

  return (
    <div className="h-full w-full flex flex-col overflow-hidden">
      {chats.length === 0 ? (
        <span className="flex items-center justify-center h-full text-gray-400">
          Don't have available chats
        </span>
      ) : (
        <div className="flex-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
          {chats.map((chat) => {
            const opponent = userId === chat.userId ? chat.employer : chat.user;
            const message = chat.messages[0]?.text || "No messages yet";
            const isActive = activeId === chat.id;
            return (
              <Link
                key={chat.id}
                href={`/chats?id=${chat.id}`}
                className={clsx(
                  "w-full flex h-[72px] items-center p-4 border-b border-[#6380a61a] transition-colors",
                  isActive ? "bg-blue-50/60" : "hover:bg-gray-50",
                )}
              >
                <div className="flex flex-row">
                  <div className="bg-[#6380a61a] rounded-full mr-2 h-[48px] w-[48px] overflow-hidden flex items-center justify-center">
                    {opponent.image ? (
                      <img
                        src={opponent.image}
                        alt={opponent.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-medium">
                        {opponent.name?.[0]?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col overflow-hidden gap-[2px]">
                    <span className="text-black text-[16px] font-medium truncate leading-tight">
                      {opponent.name}
                    </span>
                    <span className="text-black text-[12px] font-base truncate leading-tight max-w-[200px]">
                      {message}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
