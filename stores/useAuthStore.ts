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
  refreshToken: string | null;
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: any) => void;
  login: (accessToken: string, refreshToken: string, user: any) => void;
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

        setTokens: (accessToken, refreshToken) =>
          set({
            accessToken,
            refreshToken,
            isAuthenticated: !!accessToken,
          }),

        setUser: (user) => set({ user }),

        login: (accessToken, refreshToken, user) =>
          set({
            accessToken,
            refreshToken,
            // user,
            isAuthenticated: true,
            isLoading: false,
          }),

        logout: () =>
          set({
            accessToken: null,
            refreshToken: null,
            // user: null,
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
