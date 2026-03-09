import { ThemeProvider } from "@/lib/theme-context";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import mainServices from "@/api/main";
import { useAuthStore } from "@/stores/useAuthStore";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const { isAuthenticated, isLoading, setUser, user } = useAuthStore();
  const getCurrentUser = async () => {
    try {
      const data: any = await mainServices.getCurrentUser();
      setUser?.(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(isAuthenticated);
  console.log(user);

  useEffect(() => {
    getCurrentUser();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null; // Or a custom loading component
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <>
            <Stack.Screen name="login" />
            <Stack.Screen name="register" />
          </>
        )}
      </Stack>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default function RootLayout() {
  return (
    <>
      <ThemeProvider defaultTheme="system">
        <AppContent />
      </ThemeProvider>
    </>
  );
}
