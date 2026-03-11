import { useToastStore } from "@/stores/useToastStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Text } from "react-native";

export default function Toast() {
  const { visible, message, type, hideToast } = useToastStore();

  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => hideToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  const styles = {
    success: {
      bg: "bg-emerald-500",
      icon: "checkmark-circle",
    },
    error: {
      bg: "bg-red-500",
      icon: "close-circle",
    },
    info: {
      bg: "bg-blue-500",
      icon: "information-circle",
    },
  };

  const current = styles[type as keyof typeof styles];

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
      }}
      className={`absolute top-20 left-5 right-5 px-4 py-3 rounded-2xl flex-row items-center ${current.bg}`}
    >
      <Ionicons
        name={current.icon as any}
        size={22}
        color="white"
        style={{ marginRight: 8 }}
      />

      <Text className="text-white flex-1 font-medium">{message}</Text>
    </Animated.View>
  );
}
