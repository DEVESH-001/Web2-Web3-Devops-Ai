import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { Link, useRouter, type Href } from "expo-router";
import { useSignIn, useAuth, useOAuth } from "@clerk/expo";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { usePostHog } from "posthog-react-native";

const SafeAreaView = styled(RNSafeAreaView);

const SignIn = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const posthog = usePostHog();

  // All hooks must be called before any conditional returns
  const { startOAuthFlow: startGoogleOAuth } = useOAuth({
    strategy: "oauth_google",
  });

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const [showMfa, setShowMfa] = React.useState(false);
  const [isResendingCode, setIsResendingCode] = React.useState(false);
  const [isResetting, setIsResetting] = React.useState(false);

  // Navigate when signed in
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/(tabs)" as Href);
    }
  }, [isSignedIn, router]);

  // Guard: signIn can be undefined while Clerk initializes
  // This must come AFTER all hook calls
  if (!signIn) {
    return (
      <SafeAreaView className="auth-safe-area">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#ea7a53" />
        </View>
      </SafeAreaView>
    );
  }

  const handleSignIn = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    });
    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      posthog.identify(emailAddress, { $set: { email: emailAddress } });
      posthog.capture("user_signed_in", { method: "email" });
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/");
          if (url.startsWith("http")) {
            // Use Linking for external URLs on native platforms
            Linking.openURL(url).catch((err) => {
              console.error("Failed to open URL:", err);
            });
          } else {
            router.replace(url as Href);
          }
        },
      });
    } else if (
      signIn.status === "needs_second_factor" ||
      signIn.status === "needs_client_trust"
    ) {
      // Consolidated: both statuses need email code MFA
      const emailCodeFactor = signIn.supportedSecondFactors?.find(
        (factor) => factor.strategy === "email_code",
      );
      if (emailCodeFactor) {
        await signIn.mfa.sendEmailCode();
        setShowMfa(true);
      }
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const handleVerify = async () => {
    try {
      await signIn.mfa.verifyEmailCode({ code });

      if (signIn.status === "complete") {
        posthog.capture("user_mfa_verified", { method: "email_code" });
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            const url = decorateUrl("/");
            if (url.startsWith("http")) {
              // Use Linking for external URLs on native platforms
              Linking.openURL(url).catch((err) => {
                console.error("Failed to open URL:", err);
              });
            } else {
              router.replace(url as Href);
            }
          },
        });
      } else {
        console.error("MFA verification not complete:", signIn);
        Alert.alert(
          "Verification Failed",
          "Unable to verify code. Please try again.",
        );
      }
    } catch (err) {
      console.error("Verify error:", err);
      Alert.alert(
        "Verification Failed",
        "Invalid or expired code. Please try again.",
      );
    }
  };

  const handleResendCode = async () => {
    setIsResendingCode(true);
    try {
      await signIn.mfa.sendEmailCode();
      Alert.alert(
        "Code Sent",
        "A new verification code has been sent to your email.",
      );
    } catch (err) {
      console.error("Resend code error:", err);
      Alert.alert("Error", "Failed to resend code. Please try again.");
    } finally {
      setIsResendingCode(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    setShowMfa(false);
    try {
      await signIn.reset();
    } catch (err) {
      console.error("Reset error:", err);
    } finally {
      setIsResetting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { createdSessionId, setActive } = await startGoogleOAuth();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        posthog.capture("user_signed_in", { method: "google" });
        router.replace("/(tabs)" as Href);
      }
    } catch (err) {
      console.error("Google sign-in error:", err);
    }
  };

  if (showMfa) {
    return (
      <SafeAreaView className="auth-safe-area">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="auth-content">
            <View className="auth-brand-block">
              <View className="auth-logo-wrap">
                <View className="auth-logo-mark">
                  <Text className="auth-logo-mark-text">S</Text>
                </View>
                <View>
                  <Text className="auth-wordmark">SubTrack</Text>
                  <Text className="auth-wordmark-sub">
                    Subscription Tracker
                  </Text>
                </View>
              </View>
              <Text className="auth-title">Verify Your Identity</Text>
              <Text className="auth-subtitle">
                Enter the verification code sent to your email
              </Text>
            </View>

            <View className="auth-card">
              <View className="auth-form">
                <View className="auth-field">
                  <Text className="auth-label">Verification Code</Text>
                  <TextInput
                    className={
                      errors.fields?.code
                        ? "auth-input auth-input-error"
                        : "auth-input"
                    }
                    value={code}
                    placeholder="Enter code"
                    placeholderTextColor="rgba(0,0,0,0.4)"
                    onChangeText={setCode}
                    keyboardType="numeric"
                  />
                  {errors.fields?.code && (
                    <Text className="auth-error">
                      {errors.fields.code.message}
                    </Text>
                  )}
                </View>

                <Pressable
                  className={
                    code && fetchStatus !== "fetching"
                      ? "auth-button"
                      : "auth-button auth-button-disabled"
                  }
                  onPress={handleVerify}
                  disabled={!code || fetchStatus === "fetching"}
                >
                  {fetchStatus === "fetching" ? (
                    <ActivityIndicator color="#081126" />
                  ) : (
                    <Text className="auth-button-text">Verify</Text>
                  )}
                </Pressable>

                <Pressable
                  className={`auth-secondary-button ${isResendingCode ? "opacity-60" : ""}`}
                  onPress={handleResendCode}
                  disabled={isResendingCode}
                >
                  {isResendingCode ? (
                    <ActivityIndicator color="#ea7a53" size="small" />
                  ) : (
                    <Text className="auth-secondary-button-text">
                      Resend Code
                    </Text>
                  )}
                </Pressable>

                <Pressable
                  className={`auth-secondary-button ${isResetting ? "opacity-60" : ""}`}
                  onPress={handleReset}
                  disabled={isResetting}
                >
                  {isResetting ? (
                    <ActivityIndicator color="#ea7a53" size="small" />
                  ) : (
                    <Text className="auth-secondary-button-text">
                      Start Over
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="auth-safe-area">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="auth-content">
          {/* Brand block */}
          <View className="auth-brand-block">
            <View className="auth-logo-wrap">
              <View className="auth-logo-mark">
                <Text className="auth-logo-mark-text">S</Text>
              </View>
              <View>
                <Text className="auth-wordmark">SubTrack</Text>
                <Text className="auth-wordmark-sub">Subscription Tracker</Text>
              </View>
            </View>
            <Text className="auth-title">Welcome Back</Text>
            <Text className="auth-subtitle">
              Sign in to manage your subscriptions
            </Text>
          </View>

          {/* Form card */}
          <View className="auth-card">
            <View className="auth-form">
              <View className="auth-field">
                <Text className="auth-label">Email Address</Text>
                <TextInput
                  className={
                    errors.fields?.identifier
                      ? "auth-input auth-input-error"
                      : "auth-input"
                  }
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="you@example.com"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                  autoCorrect={false}
                />
                {errors.fields?.identifier && (
                  <Text className="auth-error">
                    {errors.fields.identifier.message}
                  </Text>
                )}
              </View>

              <View className="auth-field">
                <Text className="auth-label">Password</Text>
                <TextInput
                  className={
                    errors.fields?.password
                      ? "auth-input auth-input-error"
                      : "auth-input"
                  }
                  value={password}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(0,0,0,0.4)"
                  secureTextEntry
                  onChangeText={setPassword}
                  autoCorrect={false}
                />
                {errors.fields?.password && (
                  <Text className="auth-error">
                    {errors.fields.password.message}
                  </Text>
                )}
              </View>

              <Pressable
                className={
                  emailAddress && password && fetchStatus !== "fetching"
                    ? "auth-button"
                    : "auth-button auth-button-disabled"
                }
                onPress={handleSignIn}
                disabled={
                  !emailAddress || !password || fetchStatus === "fetching"
                }
              >
                {fetchStatus === "fetching" ? (
                  <ActivityIndicator color="#081126" />
                ) : (
                  <Text className="auth-button-text">Sign In</Text>
                )}
              </Pressable>

              <Pressable
                accessibilityRole="button"
                testID="forgot-password-button"
                onPress={() => {
                  Alert.alert(
                    "Forgot Password?",
                    "Please contact support or try signing in with Google.",
                    [{ text: "OK" }],
                  );
                }}
              >
                <Text className="auth-helper">Forgot Password?</Text>
              </Pressable>
            </View>
          </View>

          {/* Divider */}
          <View className="auth-divider-row">
            <View className="auth-divider-line" />
            <Text className="auth-divider-text">or</Text>
            <View className="auth-divider-line" />
          </View>

          {/* Google OAuth */}
          <Pressable
            className="auth-secondary-button"
            onPress={handleGoogleSignIn}
          >
            <Text className="auth-secondary-button-text">
              Continue with Google
            </Text>
          </Pressable>

          {/* Sign up link */}
          <View className="auth-link-row">
            <Text className="auth-link-copy">Don&apos;t have an account?</Text>
            <Link href="/(auth)/sign-up" asChild>
              <Pressable>
                <Text className="auth-link">Sign Up</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
