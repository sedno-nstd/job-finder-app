import {
  User,
  Flame,
  Settings,
  SendHorizontal,
  LayoutDashboard,
} from "lucide-react";
import { ROUTES } from "./router";

export const SIDEBAR_LINKS = {
  applicant: [
    { label: "My profile", href: ROUTES.PROFILE.ROOT, icon: User },
    { label: "Recommendations", href: "/recommendations", icon: Flame },
    { label: "Responses", href: "/responses", icon: SendHorizontal },
  ],
  employer: [
    {
      label: "Dashboard",
      href: ROUTES.EMPLOYER.ROOT,
      icon: LayoutDashboard,
    },
    { label: "Company Profile", href: ROUTES.EMPLOYER.PROFILE, icon: User },
    {
      label: "My Vacancies",
      href: ROUTES.EMPLOYER.VACANCIES,
      icon: LayoutDashboard,
    },
    {
      label: "Applicants",
      href: ROUTES.EMPLOYER.ALL_APPLICANTS,
      icon: SendHorizontal,
    },
  ],
  common: [{ label: "Settings", href: ROUTES.SETTINGS, icon: Settings }],
};
