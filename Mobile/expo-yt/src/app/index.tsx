import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function IndexScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Index Screen</Text>

      <Link href={"/second"} asChild push>
        <Button title="Go to Second Screen" />
      </Link>

      <Link href={"/third"} asChild push>
        <Button title="Go to Third Screen" />
      </Link>

      <Link href={"/fifth/sixth"} asChild push>
        <Button title={"Push to fifth screen"} />
      </Link>
    </View>
  );
}
