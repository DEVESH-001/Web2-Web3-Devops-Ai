import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { styled } from "nativewind";
import { HOME_SUBSCRIPTIONS } from "@/assets/constants/data";
import SubscriptionCard from "@/components/SubscriptionCard";

const SafeAreaView = styled(RNSafeAreaView);
const SEARCH_DEBOUNCE_MS = 250;

const toSearchableText = (value?: string) => value?.trim().toLowerCase() ?? "";

const SubscriptionsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const normalizedQuery = debouncedSearchQuery.trim().toLowerCase();

  const filteredSubscriptions = useMemo(() => {
    if (!normalizedQuery) {
      return HOME_SUBSCRIPTIONS;
    }

    return HOME_SUBSCRIPTIONS.filter((subscription) => {
      const searchableFields = [
        subscription.name,
        subscription.plan,
        subscription.category,
        subscription.status,
        subscription.billing,
      ];

      return searchableFields.some((field) =>
        toSearchableText(field).includes(normalizedQuery),
      );
    });
  }, [normalizedQuery]);

  useEffect(() => {
    if (!expandedSubscriptionId) {
      return;
    }

    const hasExpandedItem = filteredSubscriptions.some(
      (subscription) => subscription.id === expandedSubscriptionId,
    );

    if (!hasExpandedItem) {
      setExpandedSubscriptionId(null);
    }
  }, [expandedSubscriptionId, filteredSubscriptions]);

  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      <View className="mb-5">
        <Text className="text-primary font-sans-bold text-3xl">
          Subscriptions
        </Text>
        <Text className="text-muted-foreground font-sans-medium mt-2 text-base">
          Search and manage all your active plans.
        </Text>
      </View>

      <View className="border-border bg-card mb-5 flex-row items-center rounded-2xl border px-4">
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by name, plan, category, or status"
          placeholderTextColor="rgba(0, 0, 0, 0.45)"
          className="text-primary font-sans-medium flex-1 py-4 text-base"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />

        {!!searchQuery.trim() && (
          <Pressable
            onPress={() => setSearchQuery("")}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel="Clear search query"
          >
            <Text className="text-accent font-sans-semibold text-sm">
              Clear
            </Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredSubscriptions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedSubscriptionId === item.id}
            onPress={() =>
              setExpandedSubscriptionId((currentExpandedId) =>
                currentExpandedId === item.id ? null : item.id,
              )
            }
          />
        )}
        extraData={expandedSubscriptionId}
        ItemSeparatorComponent={() => <View className="h-4" />}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="home-empty-state">
            {normalizedQuery
              ? `No subscriptions found for "${debouncedSearchQuery.trim()}".`
              : "No subscriptions available yet."}
          </Text>
        }
        contentContainerClassName="pb-30"
      />
    </SafeAreaView>
  );
};

export default SubscriptionsScreen;
