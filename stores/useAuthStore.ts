import * as SecureStore from "expo-secure-store";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const secureStorage = {
  getItem: async (name: string) => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string) => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};

interface AuthState {
  accessToken: string | null;

  user: {
    co_so: null | string;
    email: string;
    id: number;
    name: string;
    role: string;
    avatar: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setTokens: (accessToken: string) => void;
  setUser: (user: {
    co_so: null | string;
    email: string;
    id: number;
    name: string;
    role: string;
    avatar: string;
  }) => void;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
        isLoading: true,

        setTokens: (accessToken) =>
          set({
            accessToken,

            isAuthenticated: !!accessToken,
          }),

        setUser: (user) => set({ user }),

        login: (accessToken) =>
          set({
            accessToken,

            isAuthenticated: true,
            isLoading: false,
          }),

        logout: () =>
          set({
            accessToken: null,
            user: {
              co_so: null,
              email: "",
              id: 0,
              name: "",
              role: "",
              avatar: "",
            },
            isAuthenticated: false,
            isLoading: false,
          }),
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() => secureStorage),
        onRehydrateStorage: () => (state) => {
          if (state) {
            state.isLoading = false;
            state.isAuthenticated = !!state.accessToken;
          }
        },
      },
    ),
  ),
);
