import authServices from "@/api/authApi";
import SelectCustom from "@/components/select-custom";
import { useAuthStore } from "@/stores/useAuthStore";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { useToastStore } from "@/stores/useToastStore";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Tab = "login" | "register";

export default function LoginScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("login");
  const { login } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [form, setForm] = useState({
    co_so: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [registered, setRegistered] = useState(false);
  const showToast = useToastStore((s) => s.showToast);
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      showLoading();
      setLoading(true);
      const res = await authServices.login({ email, password });

      login(res?.data?.data?.token);
      router.replace("/overview");
      hideLoading();
      setLoading(false);
    } catch (error) {
      hideLoading();
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      showLoading();
      setLoading(true);
      await authServices.register({
        email: form?.email,
        name: form?.fullName,
        password: form?.password,
        co_so: form?.co_so,
        password_confirmation: form?.confirmPassword,
      });
      showToast("Đăng ký thành công", "success");
      setRegistered(true);
      setLoading(false);
      hideLoading();
    } catch (error) {
      console.log(error);
      hideLoading();
      setLoading(false);
      showToast("Đăng ký thất bại", "error");
    }
  };

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <ScrollView className="flex-1 h-screen bg-white">
      {/* Background gradient */}
      <LinearGradient
        colors={["#ecfdf5", "#ffffff", "#f0fdfa"]}
        className="absolute inset-0"
      />

      <View className="px-6 pt-10 pb-10 h-screen">
        {/* Logo */}
        <View className="items-center mb-8">
          <LinearGradient
            colors={["#10b981", "#14b8a6"]}
            className="w-16 h-16  items-center justify-center mb-3"
            style={{ borderRadius: 16 }}
          >
            <Ionicons name="bar-chart" size={28} color="white" />
          </LinearGradient>

          <Text className="text-2xl font-bold text-gray-900">
            Fschool dashboard
          </Text>

          <Text className="text-gray-500 text-sm mt-1">
            Nền tảng quản lý hiệu suất
          </Text>
        </View>

        <View className="bg-white rounded-2xl shadow-lg p-6">
          {/* Heading */}

          <Text className="text-xl font-bold text-gray-900">
            {activeTab === "login"
              ? "Chào mừng trở lại 👋"
              : "Tạo tài khoản mới"}
          </Text>

          <Text className="text-gray-500 text-sm mt-1 mb-6">
            {activeTab === "login"
              ? "Đăng nhập để tiếp tục sử dụng hệ thống"
              : "Điền thông tin để đăng ký tài khoản"}
          </Text>

          {/* Tabs */}

          <View className="flex-row bg-gray-100 rounded-xl p-1 mb-6">
            <Pressable
              onPress={() => {
                setActiveTab("login");
                setRegistered(false);
              }}
              className={`flex-1 py-2 rounded-lg items-center ${
                activeTab === "login" ? "bg-white" : ""
              }`}
            >
              <Text
                className={`font-semibold ${
                  activeTab === "login" ? "text-emerald-600" : "text-gray-500"
                }`}
              >
                Đăng nhập
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                setActiveTab("register");
                setRegistered(false);
              }}
              className={`flex-1 py-2 rounded-lg items-center ${
                activeTab === "register" ? "bg-white" : ""
              }`}
            >
              <Text
                className={`font-semibold ${
                  activeTab === "register"
                    ? "text-emerald-600"
                    : "text-gray-500"
                }`}
              >
                Đăng ký
              </Text>
            </Pressable>
          </View>

          {/* LOGIN */}

          {activeTab === "login" && (
            <View className="gap-y-4">
              {/* EMAIL */}

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </Text>

                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-3">
                  <Ionicons name="mail-outline" size={18} color="#9ca3af" />

                  <TextInput
                    className="flex-1 py-3 px-2 text-sm"
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              {/* PASSWORD */}

              <View>
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Mật khẩu
                </Text>

                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-3">
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color="#9ca3af"
                    className=""
                  />

                  <TextInput
                    className="flex-1 py-3 px-2 pt-4"
                    secureTextEntry={!showPassword}
                    placeholder="************"
                    value={password}
                    onChangeText={setPassword}
                  />

                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9ca3af"
                    />
                  </Pressable>
                </View>
              </View>

              {/* REMEMBER */}

              <View className="flex-row justify-between items-center">
                <Pressable
                  onPress={() => setRememberMe(!rememberMe)}
                  className="flex-row items-center"
                >
                  <Ionicons
                    name={rememberMe ? "checkbox" : "square-outline"}
                    size={20}
                    color="#10b981"
                  />

                  <Text className="text-sm text-gray-600 ml-2">
                    Nhớ tài khoản
                  </Text>
                </Pressable>

                <TouchableOpacity
                  onPress={() => router.push("/forgot-password")}
                >
                  <Text className="text-emerald-600 text-sm">
                    Quên mật khẩu?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* LOGIN BUTTON */}

              <Pressable
                onPress={handleLogin}
                className="rounded-xl overflow-hidden mt-2"
              >
                <LinearGradient
                  colors={["#10b981", "#14b8a6"]}
                  className="py-3 items-center"
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white font-semibold">Đăng nhập</Text>
                  )}
                </LinearGradient>
              </Pressable>
            </View>
          )}

          {/* REGISTER */}

          {activeTab === "register" && !registered && (
            <View className="gap-y-4">
              <View>
                <Text className="text-sm text-gray-700 mb-2">Cơ sở</Text>
                <View className="relative">
                  <Ionicons
                    name="business-outline"
                    size={18}
                    color="#9ca3af"
                    className="absolute top-[12px] left-[8px] z-10"
                  />
                  <SelectCustom
                    type="co_so"
                    placeholder="Chọn cơ sở"
                    className="!py-3 !pr-2 !pl-10 !h-12"
                    value={form.co_so}
                    onChange={(value) => {
                      handleChange("co_so", value);
                    }}
                  />
                </View>
              </View>

              {/* FULLNAME */}

              <View>
                <Text className="text-sm text-gray-700 mb-2">Họ và tên</Text>

                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-3">
                  <Ionicons name="person-outline" size={18} color="#9ca3af" />

                  <TextInput
                    placeholder="Lê Văn A"
                    className="flex-1 py-3 px-2"
                    value={form.fullName}
                    onChangeText={(v) => handleChange("fullName", v)}
                  />
                </View>
              </View>

              {/* EMAIL */}

              <View>
                <Text className="text-sm text-gray-700 mb-2">Email</Text>

                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-3">
                  <Ionicons name="mail-outline" size={18} color="#9ca3af" />

                  <TextInput
                    className="flex-1 py-3 px-2"
                    placeholder="you@example.com"
                    value={form.email}
                    onChangeText={(v) => handleChange("email", v)}
                  />
                </View>
              </View>

              {/* PASSWORD */}

              <View>
                <Text className="text-sm text-gray-700 mb-2">Mật khẩu</Text>

                <View className="flex-row items-center border border-gray-200 rounded-xl bg-gray-50 px-3">
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color="#9ca3af"
                  />

                  <TextInput
                    secureTextEntry={!showRegPassword}
                    className="flex-1 py-3 px-2"
                    placeholder="*************"
                    value={form.password}
                    onChangeText={(v) => handleChange("password", v)}
                  />

                  <Pressable
                    onPress={() => setShowRegPassword(!showRegPassword)}
                  >
                    <Ionicons
                      name={showRegPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9ca3af"
                    />
                  </Pressable>
                </View>
              </View>

              {/* CONFIRM */}

              <View>
                <Text className="text-sm text-gray-700 mb-2">
                  Xác nhận mật khẩu
                </Text>

                <View
                  className={`flex-row items-center border rounded-xl px-3 ${
                    form.confirmPassword &&
                    form.password !== form.confirmPassword
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <Ionicons
                    name="lock-closed-outline"
                    size={18}
                    color="#9ca3af"
                  />

                  <TextInput
                    secureTextEntry={!showConfirm}
                    className="flex-1 py-3 px-2"
                    value={form.confirmPassword}
                    placeholder="*************"
                    onChangeText={(v) => handleChange("confirmPassword", v)}
                  />

                  <Pressable onPress={() => setShowConfirm(!showConfirm)}>
                    <Ionicons
                      name={showConfirm ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#9ca3af"
                    />
                  </Pressable>
                </View>

                {form.confirmPassword &&
                  form.password !== form.confirmPassword && (
                    <Text className="text-xs text-red-500 mt-1">
                      Mật khẩu không khớp
                    </Text>
                  )}
              </View>

              {/* REGISTER BUTTON */}

              <Pressable
                onPress={handleRegister}
                disabled={
                  form.password !== form.confirmPassword &&
                  form.confirmPassword.length > 0
                }
                className="rounded-xl overflow-hidden mt-2"
              >
                <LinearGradient
                  colors={["#10b981", "#14b8a6"]}
                  className="py-3 items-center"
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white font-semibold">
                      Tạo tài khoản
                    </Text>
                  )}
                </LinearGradient>
              </Pressable>
            </View>
          )}

          {/* REGISTER SUCCESS */}

          {activeTab === "register" && registered && (
            <View className="items-center py-6">
              <Ionicons name="checkmark-circle" size={64} color="#10b981" />

              <Text className="text-xl font-bold mt-4">
                Đăng ký thành công!
              </Text>

              <Text className="text-gray-500 text-center mt-2">
                Tài khoản của bạn đang chờ được duyệt.
              </Text>

              <Pressable
                onPress={() => {
                  setActiveTab("login");
                  setRegistered(false);

                  setForm({
                    co_so: "",
                    fullName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  });
                }}
                className="mt-6 rounded-xl overflow-hidden w-full"
              >
                <LinearGradient
                  colors={["#10b981", "#14b8a6"]}
                  className="py-3 items-center"
                >
                  <Text className="text-white font-semibold">
                    Quay lại đăng nhập
                  </Text>
                </LinearGradient>
              </Pressable>
            </View>
          )}
        </View>

        <Text className="text-center text-xs text-gray-400 mt-auto">
          © 2025 ReportPro. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}
