import React from "react";
import { Redirect, Slot } from "expo-router";
import { Text, View } from "react-native";

const Layout = () => {
  //   return <Slot />;
  // return(
  //     <View>
  //         <Text>Stooped by intermediate layout</Text>
  //     </View>
  return <Redirect href={"/second"} />;
};

export default Layout;
