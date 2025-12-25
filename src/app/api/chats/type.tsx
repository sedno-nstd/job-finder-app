export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: number;
  isRead: boolean;
}

export const saveChatHistory = (chatId: string, messages: Message[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(`chat_history${chatId}`, JSON.stringify(messages));
};

export const getChatHistory = (chatId: string): Message[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(`chat_history${chatId}`);
  return data ? JSON.parse(data) : [];
};

export const selectChat = (chatId: string) => {
  const {} = getChatHistory(chatId);
};
