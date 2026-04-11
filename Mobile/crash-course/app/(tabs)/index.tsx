import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-success text-xl font-bold">
        Welcome to Nativewind!
      </Text>
      <Link
        href={"/onboarding"}
        className="bg-primary mt-4 rounded-xl p-4 text-center text-white"
      >
        Go to OnBoarding
      </Link>
      <Link
        href={"/(auth)/sign-in"}
        className="bg-primary mt-4 rounded-xl p-4 text-center text-white"
      >
        Go to Sign-In
      </Link>
      <Link
        href={"/(auth)/sign-up"}
        className="bg-primary mt-4 rounded-xl p-4 text-center text-white"
      >
        Go to Sign Up
      </Link>
      <Link
        href={"/subscriptions/spotify"}
        className="bg-primary mt-4 rounded-xl p-4 text-center text-white"
      >
        Spotify Subscroption
      </Link>
      <Link
        href={{
          pathname: "/subscriptions/[id]",
          params: { id: "claude" },
        }}
        className="bg-primary mt-4 rounded-xl p-4 text-center text-white"
      >
        Claude Max Subscription
      </Link>
    </View>
  );
}
