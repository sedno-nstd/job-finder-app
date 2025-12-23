import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
  avatar: string;
}

interface UserState {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  prevUserState: User | null;
}

export const useUserState = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      prevUserState: null,
      login: async (gogleuser: User) => {
        const response = await fetch("/api/auth/google/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gogleuser),
        });

        const serverUser = await response.json();

        if (response.ok) {
          const lastUser = get().user;

          set({
            prevUserState: lastUser || get().prevUserState,
            user: serverUser,
          });
        }
      },
      logout: () =>
        set({
          user: null,
        }),
    }),
    { name: "user-storage" }
  )
);
