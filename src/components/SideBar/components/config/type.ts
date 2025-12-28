import { Search, Heart, MessageSquare, Bell, Wallet } from "lucide-react";

export const NAV_ITEMS = [
  { name: "search", label: "Search", href: "/vacancies", icon: Search },
  { name: "saved", label: "Saved", href: "/saved", icon: Heart },
  { name: "chats", label: "Chats", href: "/chats", icon: MessageSquare },
  {
    name: "notifications",
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  { name: "salary", label: "Salaries", href: "/salaries", icon: Wallet },
] as const;
