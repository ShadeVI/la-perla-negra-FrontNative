import { ThemedView } from "@/components/ThemedView";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ThemedView>
        <Text style={{ color: "black" }}>Menu</Text>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
