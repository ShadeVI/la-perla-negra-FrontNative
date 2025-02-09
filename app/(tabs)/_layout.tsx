import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTextTranslation } from "@/hooks/useTranslation";

export default function TabLayout() {
  const { translateInAppText } = useTextTranslation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors["light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: translateInAppText("tab-home"),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: translateInAppText("tab-explore-menu"),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="paperplane.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            title: translateInAppText("tab-memo"),
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="list.number.ar" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
