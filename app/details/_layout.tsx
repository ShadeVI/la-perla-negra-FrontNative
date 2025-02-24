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
      <Slot />
    </View>
  );
};
export default Layout;
