import { Tabs } from "expo-router";
import React from "react";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useTextTranslation } from "@/hooks/useTranslation";

export default function TabLayout() {
  const { translateInAppText } = useTextTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
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
  );
}
