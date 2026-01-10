import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  surname: string;
  email: string;
  image?: string;
  avatar?: string;
  role?: string;
  bio?: string;
  resumeUrl?: string;
}

interface UserState {
  user: User | null;
  tempRole: string | null;
  login: (user: User) => void;
  logout: () => void;
  prevUserState: User | null;
  updatedProfile: (data: Partial<User>) => void;

  isFullRegistration: boolean;
  startRegistration: (role: "applicant" | "employer", full: boolean) => void;
}

export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      tempRole: "",
      prevUserState: null,
      isFullRegistration: false,
      login: (serverUser: User) => set({ user: serverUser }),
      logout: () => set({ user: null, tempRole: null }),
      updatedProfile: (data) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : ({ ...data } as User),
        })),
      startRegistration: (role, full) =>
        set({
          tempRole: role,
          isFullRegistration: full,
        }),
    }),
    { name: "user-storage" }
  )
);
