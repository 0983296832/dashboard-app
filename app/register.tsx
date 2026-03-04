import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const RegisterPage: FC = () => {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState("");
  const [campus, setCampus] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    campus?: string;
    password?: string;
  }>({});

  const campusList = [
    "Cơ sở Hà Nội",
    "Cơ sở Hồ Chí Minh",
    "Cơ sở Đà Nẵng",
    "Cơ sở Cần Thơ",
    "Cơ sở Hải Phòng",
  ];

  const validateForm = () => {
    const newErrors: any = {};

    if (!email) newErrors.email = "Vui lòng nhập email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Email không hợp lệ.";

    if (!campus) newErrors.campus = "Vui lòng chọn cơ sở.";

    if (!password) newErrors.password = "Vui lòng nhập mật khẩu.";
    else if (password.length < 6)
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigation.navigate("login");
  };

  return (
    <View className="flex-1 bg-blue-50 h-screen">
      {/* Background Gradient Top */}
      <View className="absolute top-0 left-0 right-0 h-[21rem] overflow-hidden rounded-b-[48px]">
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
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 80,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View className="items-center mb-8">
          <View className="w-20 h-20 bg-white rounded-3xl items-center justify-center shadow-xl mb-4">
            <Ionicons name="school-outline" size={36} color="#2563EB" />
          </View>
          <Text className="text-2xl font-bold text-white">
            Dashboard Tuyển Sinh
          </Text>
          <Text className="text-blue-100 text-sm mt-1">
            Đăng ký tài khoản mới
          </Text>
        </View>

        {/* Card */}
        <View className="bg-white rounded-3xl p-6 shadow-2xl">
          {!success ? (
            <>
              <Text className="text-xl font-bold text-gray-800 mb-1">
                Đăng ký tài khoản
              </Text>
              <Text className="text-sm text-gray-500 mb-6">
                Tạo tài khoản mới để bắt đầu 🚀
              </Text>

              {/* Campus */}
              <View className="mb-4">
                <Text className="text-xs font-semibold text-gray-600 mb-1 uppercase">
                  Cơ sở
                </Text>

                <View
                  className={`bg-gray-50 border rounded-xl ${
                    errors.campus ? "border-red-300" : "border-gray-200"
                  }`}
                >
                  <Picker
                    className="py-3"
                    selectedValue={campus}
                    onValueChange={(value) => {
                      setCampus(value);
                      if (errors.campus)
                        setErrors({ ...errors, campus: undefined });
                    }}
                  >
                    <Picker.Item label="Chọn cơ sở" value="" />
                    {campusList.map((item) => (
                      <Picker.Item key={item} label={item} value={item} />
                    ))}
                  </Picker>
                </View>

                {errors.campus && (
                  <Text className="text-xs text-red-500 mt-1">
                    {errors.campus}
                  </Text>
                )}
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-xs font-semibold text-gray-600 mb-1 uppercase">
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
                    onChangeText={(text) => {
                      setEmail(text);
                      if (errors.email)
                        setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="example@tuyensinh.edu.vn"
                    keyboardType="email-address"
                    className={`pl-10 pr-4 py-3 bg-gray-50 border rounded-xl text-sm text-gray-800 ${
                      errors.email ? "border-red-300" : "border-gray-200"
                    }`}
                  />
                </View>

                {errors.email && (
                  <Text className="text-xs text-red-500 mt-1">
                    {errors.email}
                  </Text>
                )}
              </View>

              {/* Password */}
              <View className="mb-4">
                <Text className="text-xs font-semibold text-gray-600 mb-1 uppercase">
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
                    onChangeText={(text) => {
                      setPassword(text);
                      if (errors.password)
                        setErrors({ ...errors, password: undefined });
                    }}
                    placeholder="••••••••"
                    className={`pl-10 pr-12 py-3 bg-gray-50 border rounded-xl text-sm text-gray-800 ${
                      errors.password ? "border-red-300" : "border-gray-200"
                    }`}
                  />

                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3"
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={18}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                </View>

                {errors.password && (
                  <Text className="text-xs text-red-500 mt-1">
                    {errors.password}
                  </Text>
                )}
              </View>

              {/* Submit */}
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={loading}
                activeOpacity={0.8}
                style={{ borderRadius: 12 }}
              >
                <LinearGradient
                  colors={["#2563EB", "#3B82F6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  className="py-3.5 rounded-xl items-center justify-center flex-row space-x-2"
                  style={{ borderRadius: 12 }}
                >
                  {loading ? (
                    <>
                      <ActivityIndicator color="white" size="small" />
                      <Text className="text-white font-semibold text-sm">
                        Đang xử lý...
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text className="text-white font-semibold text-sm">
                        Đăng ký
                      </Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Back */}
              <TouchableOpacity
                onPress={handleBackToLogin}
                className="mt-5 items-center"
              >
                <Text className="text-sm text-gray-600">
                  Đã có tài khoản?{" "}
                  <Text className="font-semibold text-blue-600">Đăng nhập</Text>
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            /* Success State */
            <View className="items-center py-4">
              <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="checkmark" size={28} color="#22C55E" />
              </View>

              <Text className="text-lg font-bold text-gray-800 mb-2">
                Đăng ký thành công!
              </Text>
              <Text className="text-sm text-gray-500 mb-1">
                Tài khoản của bạn đã được tạo
              </Text>
              <Text className="text-sm font-semibold text-blue-600 mb-5">
                {email}
              </Text>

              <View className="w-full p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6">
                <Text className="text-xs text-amber-700">
                  Tài khoản của bạn đang chờ quản trị viên duyệt.
                </Text>
              </View>

              <TouchableOpacity onPress={handleBackToLogin}>
                <LinearGradient
                  colors={["#2563EB", "#3B82F6"]}
                  className="py-3 rounded-xl items-center"
                >
                  <Text className="text-white font-semibold text-sm">
                    Quay lại đăng nhập
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text className="mt-40 text-xs text-gray-400 text-center">
          © 2025 Dashboard Tuyển Sinh. All rights reserved.
        </Text>
      </ScrollView>
    </View>
  );
};

export default RegisterPage;
