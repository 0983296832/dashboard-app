import { useLoadingStore } from "@/stores/useLoadingStore";
import { ActivityIndicator, Modal, View } from "react-native";

export default function LoadingOverlay() {
  const loading = useLoadingStore((s) => s.loading);

  return (
    <Modal transparent visible={loading}>
      <View className="flex-1 items-center justify-center bg-black/40">
        <View className="bg-white px-6 py-5 rounded-2xl shadow-lg">
          <ActivityIndicator size="large" color="#059669" />
        </View>
      </View>
    </Modal>
  );
}
