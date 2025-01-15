import { Slot, Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useData } from "@/context/Data";
import { useLanguage } from "@/context/Language";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/Theme";

const Layout = () => {
  const params = useLocalSearchParams();
  const { data } = useData();
  const { selectedLanguage } = useLanguage();
  const { theme } = useTheme();

  const detailsDish = data.find((item) => item._id === params.id);

  if (!detailsDish) {
    return <Text>Not found.</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: `${detailsDish.identifierNumber} - ${
            detailsDish.title[selectedLanguage?.id ?? "es"]
          }`,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: theme?.gray },
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
    </View>
  );
};
export default Layout;
