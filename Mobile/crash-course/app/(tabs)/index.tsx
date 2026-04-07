import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-success text-xl font-bold">
        Welcome to Nativewind!
      </Text>
      <Link href={"/onboarding"} className="bg-primary mt-4 rounded text-white">
        <Text>Go to Onboarding</Text>
      </Link>
      <Link href={"/(auth)/sign-in"}>Go to SignIn</Link>
      <Link href={"/(auth)/sign-up"}>Go to SignUp</Link>

      <Link href={"/subscriptions/spotify"}>Spotify Subscription</Link>
      <Link
        href={{
          pathname: "/subscriptions/[id]",
          params: { id: "claude" },
        }}
      >
        Claude Max Subscription
      </Link>
    </View>
  );
}
