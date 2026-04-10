import { View, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  onPress: () => void;
};

const CircleButton = ({ onPress }: Props) => {
  return (
    <View className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
      <Pressable
        onPress={onPress}
        className="w-full h-full flex items-center justify-center"
      >
        <MaterialIcons name="add" size={24} color="white" />
      </Pressable>
    </View>
  );
};

export default CircleButton;
