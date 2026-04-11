import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

const SettingsScreen = () => {
  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      <Text>SettingsScreen</Text>
    </SafeAreaView>
  )
}

export default SettingsScreen