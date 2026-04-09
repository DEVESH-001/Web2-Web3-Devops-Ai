import { View } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";

const NotFound = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! not found" }} />
      <View>
        <Link href="/">Go to Home</Link>
      </View>
    </>
  );
};

export default NotFound;
