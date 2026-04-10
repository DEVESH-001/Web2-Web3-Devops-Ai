// import { ImageSourcePropType, View } from "react-native";
// import { Gesture, GestureDetector } from "react-native-gesture-handler";
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withSpring,
// } from "react-native-reanimated";

// type Props = {
//   stickerSource: ImageSourcePropType;
//   imageSize?: number;
// };

// export default function EmojiSticker({ stickerSource, imageSize = 48 }: Props) {
//   const scaleImage = useSharedValue(imageSize); // this will take the initial value of imageSize(useSharedValue ->It helps to mutate data and runs animations based on the current value)
//   const translateY = useSharedValue(0);
//   const translateX = useSharedValue(0);
//   // Double tap to zoom in and out
//   const doubleTap = Gesture.Tap()
//     .numberOfTaps(2)
//     .onStart(() => {
//       if (scaleImage.value !== imageSize) {
//         scaleImage.value = imageSize * 2;
//       } else {
//         scaleImage.value = Math.round(scaleImage.value / 2);
//       }
//     });

//   const imageStyle = useAnimatedStyle(() => {
//     return {
//       width: withSpring(scaleImage.value),
//       height: withSpring(scaleImage.value),
//     };
//   });

//   const drag = Gesture.Pan().onChange((e) => {
//     translateX.value = e.changeX;
//     translateY.value = e.changeY;
//   });

//   const containerStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateX: translateX.value,
//         },
//         {
//           translateY: translateY.value,
//         },
//       ],
//     };
//   });

//   return (
//     <GestureDetector gesture={drag}>
//       <Animated.View
//         className="absolute left-0 -top-350 right-0 bottom-0 flex items-center justify-center"
//         style={containerStyle}
//       >
//         <GestureDetector gesture={doubleTap}>
//           <Animated.Image
//             source={stickerSource}
//             style={[imageStyle, { width: imageSize, height: imageSize }]}
//             resizeMode="contain"
//           />
//         </GestureDetector>
//       </Animated.View>
//     </GestureDetector>
//   );
// }


import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { ImageSourcePropType } from "react-native";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
