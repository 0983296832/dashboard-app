import { useEffect, useRef } from "react";
import { Animated, Pressable } from "react-native";

interface Props {
  value: boolean;
  onChange: (v: boolean) => void;
}

export default function ToggleSwitch({ value, onChange }: Props) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  const bgColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E5E7EB", "#10B981"], // gray-200 → emerald-500
  });

  return (
    <Pressable onPress={() => onChange(!value)}>
      <Animated.View
        style={{
          width: 44,
          height: 24,
          borderRadius: 999,
          backgroundColor: bgColor,
          justifyContent: "center",
        }}
      >
        <Animated.View
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            backgroundColor: "white",
            transform: [{ translateX }],
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 2,
          }}
        />
      </Animated.View>
    </Pressable>
  );
}
