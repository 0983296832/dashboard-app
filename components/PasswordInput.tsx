import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

const PasswordInput = ({
  password,
  setPassword,
}: {
  password: string;
  setPassword: (v: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="relative">
      <Ionicons
        name="lock-closed-outline"
        size={18}
        color="#9CA3AF"
        style={{
          position: "absolute",
          left: 14,
          top: 14,
          zIndex: 10,
        }}
      />

      <TextInput
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          paddingVertical: 12,
          backgroundColor: "#F9FAFB",
          borderWidth: 1,
          borderColor: "#E5E7EB",
          borderRadius: 12,
        }}
      />

      <Pressable
        onPress={() => setShowPassword((prev) => !prev)}
        style={{
          position: "absolute",
          right: 12,
          top: 14,
        }}
      >
        <Ionicons
          name={showPassword ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="#9CA3AF"
        />
      </Pressable>
    </View>
  );
};

export default PasswordInput;
