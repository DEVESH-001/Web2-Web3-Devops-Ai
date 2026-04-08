import { tabs } from "@/assets/constants/data";
import { Tabs } from "expo-router";

const TabLayout = () => (
  <Tabs screenOptions={{ headerShown: false }}>
    {/* <Tabs.Screen name="index" options={{ title: "Home" }} />
    <Tabs.Screen name="subscriptions" options={{ title: "Subscriptions" }} />
    <Tabs.Screen name="insights" options={{ title: "Insights" }} />
    <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    <Tabs.Screen name="subscriptions/[id]" options={{ href: null }} /> */}
    {/* Hidden screen for dynamic subscription routing */}
    {tabs.map((tab) => (
      <Tabs.Screen
        key={tab.name}
        name={tab.name}
        options={{ title: tab.title }}
      />
    ))}
  </Tabs>
);

export default TabLayout;
