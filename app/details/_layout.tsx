import { Slot, Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useDishes } from "@/context/Dishes";
import { useLanguage } from "@/context/Language";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/Theme";

const Layout = () => {
  const params = useLocalSearchParams();
  const { dishes } = useDishes();
  const { selectedLanguage } = useLanguage();
  const { theme } = useTheme();

  const detailsDish = dishes.find((dish) => dish._id === params.id);

  if (!detailsDish) {
    return <Text>Not found.</Text>;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Stack.Screen
        options={{
          headerTitle: `${detailsDish.dishNumber} - ${
            detailsDish.title[selectedLanguage?.id ?? "es"]
          }`,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: theme?.background },
          headerRight: () =>
            detailsDish.isHighlighted ? (
              <View>
                <Ionicons name="star-sharp" size={30} color={theme?.tint} />
              </View>
            ) : null,
          headerTintColor: theme?.text,
        }}
      />
      <Slot />
    </View>
  );
};
export default Layout;
