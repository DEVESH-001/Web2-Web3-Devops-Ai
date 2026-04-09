import { Pressable, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

//Button -> in RN we use Pressable, some other functions of this are:
// - TouchableOpacity
// - TouchableHighlight
// - TouchableWithoutFeedback

type Props = {
  label: string;
  theme?: "primary" | "secondary";
  onPress?: () => void;
};

export default function Button({ label, theme = "primary", onPress }: Props) {
  return (
    <View
      className={`bg-${theme === "primary" ? "blue" : "red"}-500 rounded-lg p-2`}
    >
      <Pressable
        className="active:opacity-50"
        // onPress={() => alert("You Pressed a Button")}
        onPress={onPress}
      >
        <FontAwesome
          name="picture-o"
          size={24}
          color="white"
          className="pr-2"
        />
        <Text className="text-white text-center">{label}</Text>
      </Pressable>
    </View>
  );
}
