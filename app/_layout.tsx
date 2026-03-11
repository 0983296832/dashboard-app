import { ThemeProvider } from "@/lib/theme-context";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import mainServices from "@/api/main";
import Toast from "@/components/toast";
import { useAuthStore } from "@/stores/useAuthStore";
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const AppContent = () => {
  const { isAuthenticated, isLoading, setUser, user } = useAuthStore();
  const getCurrentUser = async () => {
    try {
      const data: any = await mainServices.getCurrentUser();
      setUser?.({
        ...data?.data,
        avatar:
          "https://readdy.ai/api/search-image?query=professional%20Vietnamese%20male%20manager%20portrait%2C%20clean%20white%20background%2C%20business%20casual%2C%20confident%20smile%2C%20high%20quality%20headshot%20photo&width=80&height=80&seq=avatar001&orientation=squarish",
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        <Toast />
      </ThemeProvider>
    </>
  );
}
