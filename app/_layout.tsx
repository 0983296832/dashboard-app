import { ThemeProvider } from "@/lib/theme-context";
import { useAuthStore } from "@/stores/useAuthStore";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";

const AppContent = () => {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
};

export default function RootLayout() {
  const { user, isHydrated } = useAuthStore();

  if (!isHydrated) return null;

  if (!user) {
    return <Redirect href="/login" />;
  }
  return (
    <>
      <ThemeProvider defaultTheme="system">
        <AppContent />
      </ThemeProvider>
    </>
  );
}
