import { Slot, Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
const Layout = () => {
  const params = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          headerTitle: params.id as string,
        }}
      />
      <Text>_layout</Text>
      <Slot />
    </View>
  );
};
export default Layout;
