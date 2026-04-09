import { View } from "react-native";
import "@/global.css";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";

import * as ImagePicker from "expo-image-picker"; // image picker
import { useState } from "react";

const placeHolderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); //result.assets is an array of assets [0] is the first asset and uri is the path to the image
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center flex-col">
      <View className="items-center justify-center">
        {/* <Image source={placeHolderImage} className="w-80 h-80" /> */}
        <ImageViewer imageSource={selectedImage ? { uri: selectedImage } : placeHolderImage} />
      </View>
      <View className="flex-row gap-4 mt-10">
        <Button label="Use this photo" theme="secondary" />
        <Button label="Choose a photo" onPress={pickImageAsync} />
      </View>
    </View>
  );
}

{
  /* <Text className="text-2xl font-bold text-blue-500"> 
        Byte(tabs-folder)
      </Text>
      <Link href={"/about"} className="underline font-bold">
        Go to About Screen
      </Link>
      <Link href={"/profile"} className="underline font-bold">
        Go to Profile Screen
      </Link> */
}
