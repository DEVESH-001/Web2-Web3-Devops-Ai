import { View, Text, Button } from "react-native";
import React from "react";
import { Link } from "expo-router";

const ThirdScreen = () => {
  return (
    <View>
      <Text>ThirdScreen</Text>
      <Link href="/" asChild push>
        <Button title="push to /" />
      </Link>
      <Link href="/" dismissTo asChild>
        <Button title="dismiss to /" />
      </Link>
    </View>
  );
};

export default ThirdScreen;
