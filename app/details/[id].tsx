import { useDishes } from "@/context/Dishes";
import { useLanguage } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const Details = () => {
  const params = useLocalSearchParams();
  const { dishes } = useDishes();
  const { selectedLanguage } = useLanguage();
  const { theme } = useTheme();

  const detailsDish = dishes.find((dish) => dish._id === params.id);

  return (
    <ScrollView
      style={{ flex: 1, width: "100%", backgroundColor: theme?.background }}
    >
      <View style={{ width: "100%" }}>
        <Animated.Image
          source={{ uri: detailsDish?.imageUrl }}
          style={{
            width: "100%",
            height: Dimensions.get("screen").height,
            objectFit: "cover",
            marginHorizontal: "auto",
          }}
          sharedTransitionTag={"dishImage"}
        />
      </View>
      <View>
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            marginTop: 20,
            color: theme?.text,
          }}
        >
          {detailsDish?.dishNumber} -{" "}
          {detailsDish?.title[selectedLanguage?.id ?? "es"]}
        </Text>
        <Text
          style={{
            textAlign: "justify",
            fontSize: 25,
            marginTop: 20,
            color: theme?.text,
          }}
        >
          {detailsDish?.description[selectedLanguage?.id ?? "es"]}
        </Text>
      </View>
    </ScrollView>
  );
};
export default Details;
const styles = StyleSheet.create({});
