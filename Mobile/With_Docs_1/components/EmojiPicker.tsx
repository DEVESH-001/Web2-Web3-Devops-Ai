import { MaterialIcons } from "@expo/vector-icons";
import { Modal, Pressable, Text, View } from "react-native";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export default function EmojiPicker({ isVisible, onClose, children }: Props) {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <Pressable className="flex-1 bg-black/70" onPress={onClose}>
        <Pressable
          className="flex-1 items-center justify-center p-6"
          onPress={(e) => e.stopPropagation()}
        >
          <View className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
            <View className="flex-row items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
              <Text className="text-gray-800 text-xl font-bold">
                Choose a Sticker
              </Text>
              <Pressable
                onPress={onClose}
                className="w-8 h-8 rounded-full bg-gray-200 items-center justify-center"
              >
                <MaterialIcons name="close" size={20} color="#374151" />
              </Pressable>
            </View>
            <View className="p-4 h-32">{children}</View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
