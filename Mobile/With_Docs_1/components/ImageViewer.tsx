import { Image, ImageSourcePropType } from "react-native";

type Props = {
  imageSource: ImageSourcePropType;
  selectedImage?: string;
};

const ImageViewer = ({ imageSource, selectedImage }: Props) => {
  const imgsource = selectedImage ? { uri: selectedImage } : imageSource;
  return <Image source={imgsource} className="w-80 h-80" resizeMode="contain" />;
};

export default ImageViewer;
