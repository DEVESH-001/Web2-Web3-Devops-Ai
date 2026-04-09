import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#3780FF", // Active tab color
        headerStyle: { backgroundColor: "#FFFFFF" }, // Header background color
        headerShadowVisible: false, // Hide header shadow
        headerTintColor: "#023863", // Header text color
        tabBarStyle: { backgroundColor: "#FFFFFF" }, // Tab bar background color
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => {
            // Tab icon
            return (
              <Ionicons
                name={focused ? "home-sharp" : "home-outline"}
                size={24}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "book-sharp" : "book-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
