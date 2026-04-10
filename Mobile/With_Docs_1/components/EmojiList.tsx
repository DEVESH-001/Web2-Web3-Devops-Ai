import { useState } from "react";
import { ImageSourcePropType, Pressable, Image, View } from "react-native";



type Props = {
  onSelect: (image: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emoji] = useState<ImageSourcePropType[]>([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ]);
  return (
    <View className="flex-row gap-3 px-4 py-3 bg-red-100">
      {emoji.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => {
            onSelect(item);
            onCloseModal?.(); // null check for onCloseModal
          }}
          style={{ transform: [{ scale: 0.95 }] }}
        >
          <Image
            source={item}
            className="w-16 h-16 rounded-lg bg-blue-400"
            resizeMode="contain"
          />
        </Pressable>
      ))}
    </View>
  );
}
