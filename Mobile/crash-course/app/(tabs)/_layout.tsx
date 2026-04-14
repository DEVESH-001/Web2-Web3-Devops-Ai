import { useAuth } from "@clerk/expo";
import { Redirect, Tabs } from "expo-router";
import { tabs } from "@/assets/constants/data";
import { View, Image, ActivityIndicator } from "react-native";
import { clsx } from "clsx";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, components } from "@/assets/constants/theme";

const tabBar = components.tabBar; // tabBar is an object with properties like horizontalInset.

export default function TabLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const insets = useSafeAreaInsets(); // Get safe area insets for proper positioning

  if (!isLoaded) {
    return (
      <View className="bg-background flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#ea7a53" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }
  // TabIcon component that renders the icon with proper styling
  const TabIcon = ({ focused, icon }: TabIconProps) => (
    <View className="tabs-icon">
      <View className={clsx("tabs-pill", focused && "tabs-active")}>
        <Image source={icon} className="tabs-glyph" resizeMode="contain" />
      </View>
    </View>
  );

  // Main tab layout component
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, tabBar.horizontalInset), // Center the tab bar horizontally
          height: tabBar.height,
          borderRadius: tabBar.radius,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          elevation: 0,
        }, // Center the tab bar vertically
        tabBarItemStyle: {
          paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6, // Center the icon vertically
        },
        tabBarIconStyle: {
          width: tabBar.iconFrame,
          height: tabBar.iconFrame,
          alignItems: "center",
        },
      }}
    >
      {/* Loop through tabs and create a screen for each */}
      {tabs.map((tab) => (
        <Tabs.Screen
          name={tab.name}
          key={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={tab.icon} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
