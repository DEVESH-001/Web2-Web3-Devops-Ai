import { Image, ImageSourcePropType, View } from "react-native";

type Props = {
  imageSource: ImageSourcePropType;
  selectedImage?: string;
  pickedEmoji?: ImageSourcePropType;
};

const ImageViewer = ({ imageSource, selectedImage, pickedEmoji }: Props) => {
  const imgsource = selectedImage ? { uri: selectedImage } : imageSource;
  return (
    <View className="relative">
      <Image source={imgsource} className="w-80 h-80" resizeMode="contain" />
      {pickedEmoji && (
        <Image
          source={pickedEmoji}
          className="absolute w-20 h-20 bottom-10 right-10"
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default ImageViewer;
