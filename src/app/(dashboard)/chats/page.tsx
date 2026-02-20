import { ChatList } from "@/src/components/chats/ChatList";
import { GetChatMessages, UserChats } from "../../../actions/chat";
import { ChatInput } from "@/src/components/chats/ChatInput";
import { getServerSession } from "next-auth/next";
import { ChatMessages } from "@/src/components/chats/ChatMessages";
import { authConfig } from "@/src/config/auth";

export default async function ChatsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authConfig);

  const myId = (session?.user as any)?.id;

  const chat = await UserChats(myId);
  const selectedChatId = (await searchParams).id;
  const currencyChat = chat.find((c) => c.id === selectedChatId);

  const messages = selectedChatId ? await GetChatMessages(selectedChatId) : [];
  const opponent = currencyChat?.users.find((u) => u.id !== myId);

  return (
    <div className="flex w-full h-[calc(100vh-160px)] grid-cols-2 border bg-white border-[#6380a61a] rounded-xl">
      <div className="w-[350px] border-r border-[#6380a61a] h-full flex flex-col">
        <ChatList chats={chat} userId={myId} />
      </div>
      <div className="flex-1 flex flex-col relative bg-[#fcfcfc]">
        {selectedChatId && opponent ? (
          <>
            <ChatMessages messages={messages} myId={myId} />

            <div>
              {currencyChat && (
                <ChatInput chatId={currencyChat?.id} myId={myId} />
              )}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Select a chat to start a conversation
          </div>
        )}
      </div>
    </div>
  );
}
