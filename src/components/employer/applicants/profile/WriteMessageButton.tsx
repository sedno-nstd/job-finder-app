"use client";
import { CreateChat } from "@/src/actions/common/chat";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  opponentId: string;
  vacancyId: string;
}

export function WriteMessageButton({ opponentId, vacancyId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateChat = async () => {
    setLoading(true);
    try {
      const res = await CreateChat(opponentId, vacancyId);

      if (res.success && res.chatId) {
        router.push(`/chats?id=${res.chatId}`);
      }
    } catch (err) {
      console.error("Failed to create chat:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCreateChat}
      disabled={loading}
      className="w-full md:w-auto bg-blue-600 cursor-pointer text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
    >
      {loading ? "Connecting..." : "Write Message"}
    </button>
  );
}
