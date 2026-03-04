import { useAuthStore } from "@/stores/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const { login } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("admin@tuyensinh.edu.vn");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [view, setView] = useState<"login" | "forgot">("login");
  const navigation = useNavigation<any>();

  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setLoading(true);

    try {
      // Giả lập API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Fake check demo account
      if (email !== "admin@tuyensinh.edu.vn" || password !== "admin123") {
        throw new Error("Sai tài khoản hoặc mật khẩu");
      }

      // Gọi store
      login(email);

      router.replace("/overview");
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setForgotError("");

    if (!forgotEmail) {
      setForgotError("Vui lòng nhập địa chỉ email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail)) {
      setForgotError("Email không hợp lệ.");
      return;
    }

    setForgotLoading(true);

    setTimeout(() => {
      setForgotLoading(false);
      setForgotSuccess(true);
    }, 1500);
  };

  const handleBackToLogin = () => {
    setView("login");
    setForgotEmail("");
    setForgotError("");
    setForgotSuccess(false);
    setPassword("");
  };

  return (
    <View className="flex-1 bg-blue-50">
      <View className="absolute top-0 left-0 right-0 h-[19.8rem] overflow-hidden rounded-b-[48px]">
        {/* Gradient nền */}
        <LinearGradient
          colors={["#2563EB", "#60A5FA"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 rounded-b-[48px]"
        />

        {/* Bubble 1 */}
        <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/15 rounded-full" />

        {/* Bubble 2 */}
        <View className="absolute top-10 -left-8 w-28 h-28 bg-white/15 rounded-full" />

        {/* Bubble 3 */}
        <View className="absolute bottom-4 right-16 w-16 h-16 bg-white/15 rounded-full" />
      </View>

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        className="px-5"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View className="items-center mt-16 mb-12">
          <View className="w-20 h-20 bg-white rounded-3xl shadow-xl items-center justify-center mb-4">
            <Ionicons name="school-outline" size={36} color="#2563EB" />
          </View>

          <Text className="text-2xl font-bold text-white">
            Dashboard Tuyển Sinh
          </Text>
          <Text className="text-blue-100 text-sm mt-1">
            Quản lý tuyển sinh thông minh
          </Text>
        </View>

        {/* Card */}
        <View className="bg-white rounded-3xl shadow-2xl p-6 mb-10">
          {view === "login" && (
            <>
              <Text className="text-xl font-bold text-gray-800 mb-1">
                Đăng nhập
              </Text>
              <Text className="text-sm text-gray-500 mb-6">
                Chào mừng bạn trở lại 👋
              </Text>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-xs font-semibold text-gray-600 mb-1.5 uppercase">
                  Email
                </Text>
                <View className="relative">
                  <Ionicons
                    name="mail-outline"
                    size={18}
                    color="#9CA3AF"
                    style={{
                      position: "absolute",
                      left: 12,
                      top: 12,
                      zIndex: 10,
                    }}
                  />

                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="admin@tuyensinh.edu.vn"
                    className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm "
                  />
                </View>
              </View>

              {/* Password */}
              <View className="mb-4">
                <Text className="text-xs font-semibold text-gray-600 mb-1.5 uppercase">
                  Mật khẩu
                </Text>

                <View className="relative">
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color="#9CA3AF"
                    style={{
                      position: "absolute",
                      left: 12,
                      top: 12,
                      zIndex: 10,
                    }}
                  />

                  <TextInput
                    // secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    className="pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                  />
                  <Pressable
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9CA3AF"
                    />
                  </Pressable>
                </View>
              </View>

              {/* Remember + Forgot */}
              <View className="flex-row justify-between items-center mb-4">
                <Pressable
                  onPress={() => setRememberMe(!rememberMe)}
                  className="flex-row items-center gap-2"
                >
                  <View
                    className={`w-4 h-4 rounded border items-center justify-center ${
                      rememberMe
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {rememberMe && (
                      <Ionicons name="checkmark" size={12} color="white" />
                    )}
                  </View>
                  <Text className="text-xs text-gray-600">Nhớ tài khoản</Text>
                </Pressable>

                <Pressable onPress={() => setView("forgot")}>
                  <Text className="text-xs text-blue-600 font-medium">
                    Quên mật khẩu?
                  </Text>
                </Pressable>
              </View>

              {/* Error */}
              {error !== "" && (
                <View className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl mb-4">
                  <Text className="text-xs text-red-600">{error}</Text>
                </View>
              )}

              {/* Submit */}
              <Pressable
                onPress={handleLogin}
                disabled={loading}
                className="py-3.5 rounded-xl items-center justify-center flex-row gap-2"
                style={{
                  backgroundColor: "#2563EB",
                }}
              >
                {loading ? (
                  <>
                    <ActivityIndicator color="white" />
                    <Text className="text-white font-semibold">
                      Đang đăng nhập...
                    </Text>
                  </>
                ) : (
                  <>
                    <Text className="text-white font-semibold">Đăng nhập</Text>
                  </>
                )}
              </Pressable>

              {/* Demo */}
              <View className="mt-5 p-3.5 bg-blue-50 rounded-xl border border-blue-100">
                <Text className="text-xs text-blue-700 font-semibold mb-1">
                  Tài khoản demo:
                </Text>
                <Text className="text-xs text-blue-600">
                  📧 admin@tuyensinh.edu.vn
                </Text>
                <Text className="text-xs text-blue-600">🔑 admin123</Text>
              </View>

              <View className="mt-5 items-center">
                <Pressable
                  onPress={() => navigation.navigate("register")}
                  className="active:opacity-70"
                >
                  <Text className="text-sm text-gray-600">
                    Chưa có tài khoản?{" "}
                    <Text className="font-semibold text-blue-600">Đăng ký</Text>
                  </Text>
                </Pressable>
              </View>
            </>
          )}
          {view === "forgot" && (
            <>
              {/* ===== BACK BUTTON ===== */}
              <Pressable
                onPress={handleBackToLogin}
                className="flex-row items-center gap-1.5 mb-5"
              >
                <Ionicons name="arrow-back-outline" size={18} color="#6B7280" />
                <Text className="text-sm text-gray-500">
                  Quay lại đăng nhập
                </Text>
              </Pressable>

              {!forgotSuccess ? (
                <>
                  {/* ===== HEADER ===== */}
                  <View className="flex-row items-center gap-3 mb-5">
                    <View className="w-11 h-11 items-center justify-center bg-blue-100 rounded-2xl">
                      <Ionicons
                        name="lock-closed-outline"
                        size={20}
                        color="#2563EB"
                      />
                    </View>

                    <View>
                      <Text className="text-xl font-bold text-gray-800">
                        Quên mật khẩu?
                      </Text>
                      <Text className="text-xs text-gray-500 mt-0.5">
                        Nhập email để nhận link đặt lại
                      </Text>
                    </View>
                  </View>

                  {/* ===== EMAIL INPUT ===== */}
                  <View className="mb-4">
                    <Text className="text-xs font-semibold text-gray-600 mb-1.5 uppercase">
                      Email
                    </Text>

                    <View className="relative">
                      <Ionicons
                        name="mail-outline"
                        size={18}
                        color="#9CA3AF"
                        style={{
                          position: "absolute",
                          left: 12,
                          top: 14,
                          zIndex: 10,
                        }}
                      />

                      <TextInput
                        value={forgotEmail}
                        onChangeText={setForgotEmail}
                        placeholder="Nhập địa chỉ email của bạn"
                        className="pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm"
                      />
                    </View>
                  </View>

                  {/* ===== ERROR ===== */}
                  {forgotError !== "" && (
                    <View className="flex-row items-center gap-2 px-4 py-3 bg-red-50 border border-red-100 rounded-xl mb-4">
                      <Ionicons
                        name="warning-outline"
                        size={16}
                        color="#EF4444"
                      />
                      <Text className="text-xs text-red-600">
                        {forgotError}
                      </Text>
                    </View>
                  )}

                  {/* ===== SUBMIT ===== */}
                  <Pressable
                    onPress={handleForgotPassword}
                    disabled={forgotLoading}
                    className="w-full py-3.5 rounded-xl flex-row items-center justify-center gap-2"
                    style={{
                      backgroundColor: "#2563EB",
                    }}
                  >
                    {forgotLoading ? (
                      <>
                        <ActivityIndicator color="white" />
                        <Text className="text-white font-semibold">
                          Đang gửi...
                        </Text>
                      </>
                    ) : (
                      <>
                        <Ionicons
                          name="paper-plane-outline"
                          size={18}
                          color="white"
                        />
                        <Text className="text-white font-semibold">
                          Gửi link đặt lại mật khẩu
                        </Text>
                      </>
                    )}
                  </Pressable>
                </>
              ) : (
                /* ===== SUCCESS STATE ===== */
                <View className="items-center text-center py-4">
                  <View className="w-16 h-16 items-center justify-center bg-green-100 rounded-full mb-4">
                    <Ionicons
                      name="mail-open-outline"
                      size={28}
                      color="#22C55E"
                    />
                  </View>

                  <Text className="text-lg font-bold text-gray-800 mb-2">
                    Kiểm tra email của bạn!
                  </Text>

                  <Text className="text-sm text-gray-500 mb-1 text-center">
                    Chúng tôi đã gửi link đặt lại mật khẩu đến
                  </Text>

                  <Text className="text-sm font-semibold text-blue-600 mb-5">
                    {forgotEmail}
                  </Text>

                  <Text className="text-xs text-gray-400 mb-6 text-center">
                    Không nhận được email? Kiểm tra thư mục spam hoặc thử lại
                    sau vài phút.
                  </Text>

                  <Pressable
                    onPress={handleBackToLogin}
                    className="w-full py-3 rounded-xl items-center"
                    style={{
                      backgroundColor: "#2563EB",
                    }}
                  >
                    <Text className="text-white font-semibold">
                      Quay lại đăng nhập
                    </Text>
                  </Pressable>
                </View>
              )}
            </>
          )}
        </View>

        <Text className="text-xs text-gray-400 text-center mb-6 mt-auto">
          © 2025 Dashboard Tuyển Sinh
        </Text>
      </ScrollView>
    </View>
  );
}
