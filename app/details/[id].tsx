import { Colors } from "@/constants/Colors";
import { useDishes } from "@/context/Dishes";
import { useLanguage } from "@/context/Language";
import { ColorScheme, useTheme } from "@/context/Theme";
import { useLocalSearchParams } from "expo-router";
import {
  useWindowDimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

const Details = () => {
  const params = useLocalSearchParams();
  const { dishes } = useDishes();
  const { selectedLanguage } = useLanguage();
  const { theme, colorScheme } = useTheme();
  const { height } = useWindowDimensions();

  const detailsDish = dishes.find((dish) => dish._id === params.id);

  const styles = createStyles(theme, colorScheme);

  if (!detailsDish) {
    return <Text>No data found.</Text>;
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={[styles.imageContainer, { height: height - 100 }]}>
        <Animated.Image
          source={{ uri: detailsDish?.imageUrl }}
          style={styles.image}
          sharedTransitionTag={"dishImage"}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.contentLeft}>
          <Text style={styles.title}>
            {detailsDish?.dishNumber} -{" "}
            {detailsDish?.title[selectedLanguage?.id ?? "es"]}
          </Text>
          <Text style={styles.description}>
            {detailsDish?.description[selectedLanguage?.id ?? "es"]}
          </Text>
        </View>
        <View style={styles.contentRight}>
          <Text style={styles.ingredientsTitle}>Ingredientes</Text>
          <View style={styles.ingredientsContainer}>
            {detailsDish?.ingredients?.length > 0
              ? detailsDish?.ingredients.map((ingredient) => {
                  return (
                    <View key={ingredient._id} style={styles.badge}>
                      <Text style={styles.ingredientName}>
                        {ingredient.name[selectedLanguage?.id || "es"]}
                      </Text>
                    </View>
                  );
                })
              : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Details;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    scrollContainer: {
      flex: 1,
      width: "100%",
      backgroundColor: theme?.background,
    },
    imageContainer: {
      width: "100%",
      boxShadow: "0 2px 10px 1px rgba(255,255,255, 0.5)",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      marginHorizontal: "auto",
    },
    content: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginVertical: 50,
    },
    contentLeft: {
      flex: 1,
      paddingHorizontal: 30,
    },
    contentRight: {
      flex: 1,
      paddingHorizontal: 30,
    },
    title: {
      fontSize: 30,
      color: theme?.text,
    },
    description: {
      textAlign: "justify",
      fontSize: 25,
      marginTop: 20,
      color: theme?.text,
    },
    ingredientsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      columnGap: 30,
      rowGap: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    badge: {
      padding: 12,
      borderRadius: 20,
      backgroundColor: "white",
      flexShrink: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    ingredientName: {
      textAlign: "center",
      fontSize: 18,
    },
    ingredientsTitle: {
      color: theme?.text,
      fontSize: 28,
      textAlign: "center",
      textDecorationLine: "underline",
      marginBottom: 20,
    },
  });
