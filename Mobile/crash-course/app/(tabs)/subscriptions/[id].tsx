import { View, Text } from "react-native";
import React from "react";
import { Link, useLocalSearchParams } from "expo-router";

const SubscriptionDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  console.log(id);
  return (
    <View>
      <Text>Subscription Details : {id}</Text>
      <Link href={"/"}>Go back</Link>
    </View>
  );
};

export default SubscriptionDetailsScreen;
