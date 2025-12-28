import { ChatList } from "@/src/components/chats/ChatList";
import { GetChatMessages, UserChats } from "../../actions/chat";
import clsx from "clsx";
import { ChatInput } from "@/src/components/chats/ChatInput";
import { getServerSession } from "next-auth";
import { handler } from "../../api/auth/[...nextauth]/route";

export default async function ChatsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const session = await getServerSession(handler);

  // if(!session.user) {
  //   return "Enter the account"
  // }
  const myId = "cmjko5vj50004llc88aohxpvp";
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
            <div className="flex items-center justify-between p-4 border-b h-[72px] border-[#6380a61a] bg-white">
              <span className="text-lg font-medium text-black">
                {opponent.name}
              </span>

              <div className="bg-[#6380a61a] rounded-full h-10 w-10 flex items-center justify-center font-bold text-blue-600">
                {opponent.name[0].toUpperCase()}
              </div>
            </div>

            <div
              className={clsx(
                "flex-1 overflow-y-auto py-4 pl-4 pr-2 flex flex-col gap-2 custom-scrollbar"
              )}
            >
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
                        "px-4 py-2 rounded-2xl text-sm max-w-[50%]",
                        "break-words overflow-hidden whitespace-pre-wrap",
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
            <div>
              <ChatInput chatId={currencyChat?.id} myId={myId} />
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Выберите чат, чтобы начать общение
          </div>
        )}
      </div>
    </div>
  );
}
