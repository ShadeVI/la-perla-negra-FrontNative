import { Slot, Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useDishes } from "@/context/Dishes";
import { useLanguage } from "@/context/Language";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/Theme";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

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
    <SafeAreaView
      style={{ flex: 1, marginTop: 0, borderColor: "red", borderWidth: 2 }}
    >
      <Stack.Screen
        options={{
          headerTitle: `${detailsDish.identifierNumber} - ${
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
          headerTransparent: true,
        }}
      />
      <Slot />
    </SafeAreaView>
  );
};
export default Layout;
