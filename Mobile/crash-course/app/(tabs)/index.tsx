import "@/global.css";
import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"; //SAV is 3rd party component, so we need to import it like this
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView); //we need to wrap the SAV with styled to make it work with nativewind

export default function App() {
  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      <Text className="font-sans-extrabold text-7xl">Home</Text>

      <Link
        href={"/onboarding"}
        className="bg-primary font-sans-bold mt-4 rounded-xl p-4 text-center text-white"
      >
        Go to OnBoarding
      </Link>
      <Link
        href={"/(auth)/sign-in"}
        className="bg-primary font-sans-bold mt-4 rounded-xl p-4 text-center text-white"
      >
        Go to Sign-In
      </Link>
      <Link
        href={"/(auth)/sign-up"}
        className="bg-primary font-sans-bold mt-4 rounded-xl p-4 text-center text-white"
      >
        Go to Sign Up
      </Link>
    </SafeAreaView>
  );
}
