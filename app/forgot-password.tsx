import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <LinearGradient
      colors={["#ecfdf5", "#ffffff", "#f0fdfa"]}
      className="flex-1 justify-center px-4 py-8"
    >
      <View className="w-full max-w-md self-center">
        {/* Logo */}
        <View className="items-center mb-8">
          <Image
            source={{
              uri: "https://public.readdy.ai/ai/img_res/f4f580fb-f2b6-4d43-a9d7-297924eb6915.png",
            }}
            className="h-16 w-16 mb-4"
            resizeMode="contain"
          />

          <Text className="text-2xl font-bold text-gray-800">
            Hệ thống Báo cáo
          </Text>

          <Text className="text-sm text-gray-500 mt-1">
            Quản lý và theo dõi hiệu suất
          </Text>
        </View>

        {/* Card */}
        <View className="bg-white rounded-2xl shadow-lg p-6">
          {!submitted ? (
            <>
              <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-800">
                  Quên mật khẩu
                </Text>

                <Text className="text-sm text-gray-500 mt-1">
                  Nhập email của bạn, chúng tôi sẽ gửi link đặt lại mật khẩu.
                </Text>
              </View>

              {/* Email */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Email
                </Text>

                <View className="relative">
                  <View className="absolute left-3 top-3">
                    <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
                  </View>

                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Nhập địa chỉ email"
                    keyboardType="email-address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm"
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-emerald-500 py-3 rounded-lg mt-2"
              >
                <Text className="text-white text-center font-medium">
                  Gửi yêu cầu
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View className="items-center py-4">
              <View className="w-16 h-16 bg-emerald-100 rounded-full items-center justify-center mb-4">
                <Ionicons name="mail-open-outline" size={32} color="#10B981" />
              </View>

              <Text className="text-lg font-semibold text-gray-800 mb-2">
                Đã gửi email!
              </Text>

              <Text className="text-sm text-gray-500 text-center mb-6">
                Chúng tôi đã gửi link đặt lại mật khẩu đến{" "}
                <Text className="font-medium text-gray-700">{email}</Text>. Vui
                lòng kiểm tra hộp thư của bạn.
              </Text>

              <TouchableOpacity onPress={() => setSubmitted(false)}>
                <Text className="text-sm text-emerald-600 font-medium">
                  Gửi lại email
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Back to login */}
          <View className="mt-6 items-center">
            <Link href="/login" asChild>
              <TouchableOpacity className="flex-row items-center gap-1">
                <Ionicons name="arrow-back" size={16} color="#6B7280" />
                <Text className="text-sm text-gray-500">
                  Quay lại đăng nhập
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
