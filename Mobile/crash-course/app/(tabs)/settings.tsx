import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useClerk, useUser } from "@clerk/expo";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import Constants from "expo-constants";
import { usePostHog } from "posthog-react-native";

const SafeAreaView = styled(RNSafeAreaView);

const SettingsScreen = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const posthog = usePostHog();

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      posthog.capture("user_signed_out");
      posthog.reset();
      await signOut();
    } catch (err) {
      console.error("Sign out error:", err);
      Alert.alert("Sign Out Failed", "Unable to sign out. Please try again.");
    } finally {
      setIsSigningOut(false);
    }
  };

  const userName =
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "User";
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";

  return (
    <SafeAreaView className="bg-background flex-1">
      <ScrollView className="flex-1 p-5">
        {/* Profile Header */}
        <View className="mb-8">
          <Text className="font-sans-bold text-primary text-3xl">Settings</Text>
          <Text className="font-sans-medium text-muted-foreground mt-2 text-base">
            Manage your account and preferences
          </Text>
        </View>

        {/* Account Section */}
        <View className="border-border bg-card mb-6 rounded-2xl border p-5">
          <Text className="font-sans-bold text-primary mb-4 text-lg">
            Account
          </Text>
          <View className="gap-2">
            <Text className="font-sans-semibold text-primary text-base">
              {userName}
            </Text>
            <Text className="font-sans-medium text-muted-foreground text-sm">
              {userEmail}
            </Text>
          </View>
        </View>

        {/* Sign Out Button */}
        <Pressable
          className={`bg-accent items-center rounded-2xl py-4 ${isSigningOut ? "opacity-60" : ""}`}
          onPress={handleSignOut}
          disabled={isSigningOut}
        >
          {isSigningOut ? (
            <ActivityIndicator color="#081126" />
          ) : (
            <Text className="font-sans-bold text-primary text-base">
              Sign Out
            </Text>
          )}
        </Pressable>

        {/* App Info */}
        <View className="mt-8 items-center">
          <Text className="font-sans-medium text-muted-foreground text-sm">
            SubTrack v{Constants.expoConfig?.version ?? "1.0.0"}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;
