import "@/global.css";

import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context"; //SAV is 3rd party component, so we need to import it like this
import { styled } from "nativewind";
import images from "@/assets/constants/images";
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from "@/assets/constants/data";
import { icons } from "@/assets/constants/icons";
import { formatCurrency } from "@/libs/utils";
import dayjs from "dayjs";
import ListHeading from "@/components/ListHeading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useState } from "react";
const SafeAreaView = styled(RNSafeAreaView); //we need to wrap the SAV with styled to make it work with nativewind

export default function App() {
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null); //(this tracks which subs card is explanded)

  return (
    <SafeAreaView className="bg-background flex-1 p-5">
      <FlatList
        ListHeaderComponent={() => (
          <>
            {/* Header */}
            <View className="home-header">
              <View className="home-user">
                <Image source={images.avatar} className="home-avatar" />
                <Text className="home-user-name">{HOME_USER.name}</Text>
              </View>
              <Image source={icons.add} className="home-add-icon" />
            </View>

            {/* Balance card */}
            <View className="home-balance-card">
              <Text className="home-balance-label">Balance</Text>
              {/* Amount row */}
              <View className="home-balance-row">
                <Text className="home-balance-amount">
                  {formatCurrency(HOME_BALANCE.amount)}
                </Text>
                {/* Next renewal date */}
                <Text className="home-balance-date">
                  {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
                </Text>
              </View>
            </View>

            {/* Upcoming Subscriptions */}
            <View className="mb-5">
              <ListHeading title="Upcoming Subscriptions" />
              <FlatList
                data={UPCOMING_SUBSCRIPTIONS}
                renderItem={({ item }) => (
                  <UpcomingSubscriptionCard {...item} />
                )}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListEmptyComponent={
                  <Text className="home-empty-state">
                    No Upcoming renewal yet.
                  </Text>
                }
              />
            </View>
            {/* All Subscriptions */}
            <ListHeading title="All Subscriptions" />
          </>
        )} // adds spacing before the list(useful for visual separation, like the header)
        data={HOME_SUBSCRIPTIONS}
        keyExtractor={(item) => item.id} // (unique identifier for each item)
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedSubscriptionId === item.id} //(expanded = true when the subscription is expanded)
            onPress={() =>
              //(toggle expand/collapse)
              setExpandedSubscriptionId((currentId) =>
                currentId === item.id ? null : item.id,
              )
            }
          />
        )}
        extraData={expandedSubscriptionId} // (re-renders only when expandedSubscriptionId changes[useful for performance])
        ItemSeparatorComponent={() => <View className="h-4" />} // adds spacing between items
        showsVerticalScrollIndicator={false} // hides the vertical scroll indicator
        ListEmptyComponent={
          <Text className="home-empty-state">No subscriptions yet.</Text>
        }
        contentContainerClassName="pb-30" // adds padding at the bottom to prevent content from being hidden behind the tab bar
      />
    </SafeAreaView>
  );
}
