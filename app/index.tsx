import { useAuthStore } from "@/stores/useAuthStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  return <Redirect href={isAuthenticated ? "/(tabs)/overview" : "/login"} />;
}
