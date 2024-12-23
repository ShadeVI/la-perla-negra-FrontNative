import { useDishes } from "@/context/Dishes";
import { Slot, Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
const Layout = () => {
  const params = useLocalSearchParams();
  const { dishes } = useDishes();

  const detailsDish = dishes.find((dish) => dish._id === params.id);

  if (!detailsDish) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          headerTitle: detailsDish.title.es,
        }}
      />
      <Text>_layout</Text>
      <Slot />
    </View>
  );
};
export default Layout;
