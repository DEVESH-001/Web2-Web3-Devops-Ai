import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";

type Props = {
  onPress: () => void;
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
};

export default function IconButton({ onPress, label, icon }: Props) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-2">
      <MaterialIcons name={icon} size={24} color="white" />
      <Text className="text-white">{label}</Text>
    </Pressable>
  );
}
