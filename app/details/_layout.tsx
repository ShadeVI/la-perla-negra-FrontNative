import { Slot, Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { useData } from "@/context/Data";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/context/Theme";
import { useTextTranslation } from "@/hooks/useTranslation";

const Layout = () => {
  const params = useLocalSearchParams();
  const { data } = useData();
  const { theme } = useTheme();
  const { translateCMSText, translateInAppText } = useTextTranslation();

  const detailsDish = data.find((item) => item._id === params.id);

  if (!detailsDish) {
    return <Text>{translateInAppText("no-data-found")}</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: `${detailsDish.identifierNumber} - ${translateCMSText(
            detailsDish.title
          )}`,
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
