import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";

interface Option {
  label: string;
  value: string | number;
}

interface Props {
  value?: string | number;
  options: Option[];
  onChange: (v: any) => void;
  placeholder?: string;
}

export default function SelectInput({
  value,
  options,
  onChange,
  placeholder = "Select...",
}: Props) {
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  return (
    <>
      {/* INPUT */}
      <Pressable
        onPress={() => setOpen(true)}
        className="h-9 px-3 border border-gray-200 rounded-lg bg-gray-50 flex-row items-center justify-between"
      >
        <Text className="text-sm text-gray-700">
          {selected?.label || placeholder}
        </Text>

        <Ionicons name="chevron-down" size={16} color="#6b7280" />
      </Pressable>

      {/* MODAL */}
      <Modal visible={open} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/30 justify-center px-6"
          onPress={() => setOpen(false)}
        >
          <View className="bg-white rounded-xl max-h-80">
            <FlatList
              data={options}
              keyExtractor={(i) => String(i.value)}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChange(item.value);
                    setOpen(false);
                  }}
                  className="px-4 py-3 border-b border-gray-100"
                >
                  <Text className="text-sm text-gray-700">{item.label}</Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
