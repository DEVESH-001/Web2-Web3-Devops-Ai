import { ImageSourcePropType, View } from "react-native";
import "@/global.css";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker"; // image picker
import { useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const placeHolderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false); // show app options(like use this photo, choose a photo) app are just buttons here
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSourcePropType | undefined
  >(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
    console.log("Add sticker");
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = () => {
    // TODO: Save image functionality
    console.log("Save image");
  };

  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center flex-col"> 
      <View className="items-center justify-center relative">
        {/* <ImageViewer
          imageSource={
            selectedImage ? { uri: selectedImage } : placeHolderImage
          }
          selectedImage={selectedImage}
          pickedEmoji={pickedEmoji}
        /> */}
        <ImageViewer
          imageSource={placeHolderImage}
          selectedImage={selectedImage}
        />
        {pickedEmoji && (
          <EmojiSticker stickerSource={pickedEmoji} imageSize={48} />
        )}
      </View>
      {showAppOptions ? (
        <View className="flex-row items-center justify-center gap-6 mt-6">
          <IconButton icon="refresh" label="Reset" onPress={onReset} />
          <CircleButton onPress={onAddSticker} />
          <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
        </View>
      ) : (
        <View className="flex-1/3 items-center justify-center flex-row gap-4 mt-10">
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
          <Button label="Choose a photo" onPress={pickImageAsync} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {/* {Emoji list comp will go here} */}
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}
