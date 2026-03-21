import {
  Search,
  Heart,
  MessageSquare,
  Bell,
  Wallet,
  PlusCircle,
  Briefcase,
} from "lucide-react";

export type UserRole = "everyone" | "applicant" | "employer";

export interface NavItem {
  readonly name: string;
  readonly label: string;
  readonly href: string;
  readonly icon: any;
  readonly role: UserRole;
}

export const NAV_ITEMS: NavItem[] = [
  {
    name: "search",
    label: "Search",
    href: "/vacancies",
    icon: Search,
    role: "everyone",
  },
  {
    name: "my-vacancies",
    label: "My Vacancies",
    href: "/employer/vacancies-page",
    icon: Briefcase,
    role: "employer",
  },
  {
    name: "create-vacancy",
    label: "Post a Job",
    href: "/employer/create-vacancy",
    icon: PlusCircle,
    role: "employer",
  },
  {
    name: "saved",
    label: "Saved",
    href: "/saved",
    icon: Heart,
    role: "applicant",
  },
  {
    name: "chats",
    label: "Chats",
    href: "/chats",
    icon: MessageSquare,
    role: "everyone",
  },
  {
    name: "notifications",
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
    role: "everyone",
  },
  {
    name: "salary",
    label: "Salaries",
    href: "/salaries",
    icon: Wallet,
    role: "applicant",
  },
];
