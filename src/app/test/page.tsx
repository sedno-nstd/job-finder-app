import { UserChats } from "../actions/chat";

export default async function TestPage() {
  const chats = await UserChats("cmjko5vj50004llc88aohxpvp");

  return (
    <div style={{ padding: "20px" }}>
      <h1>Мои чаты</h1>
      <div>
        {chats.map((chat) => (
          <div
            key={chat.id}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3 style={{ margin: 0 }}>
              {chat.users.map((u) => u.name).join(", ")}
            </h3>

            <p style={{ color: "#666", fontSize: "14px" }}>
              {chat.messages.length > 0
                ? chat.messages[0].text
                : "Сообщений пока нет"}
            </p>

            <span style={{ fontSize: "10px", color: "#999" }}>
              {chat.messages[0] &&
                new Date(chat.messages[0].createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
