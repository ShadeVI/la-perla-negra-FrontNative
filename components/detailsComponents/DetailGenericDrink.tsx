import React from "react";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { ColorScheme, useTheme } from "@/context/Theme";
import { GenericSimpleDescriptionDrink } from "@/lib/sanity/httpSanity";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { Easing, FadeIn, FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { ORDER_REDUCER_TYPES, useOrder } from "@/context/Order";

interface DetailGenericDrinkProps {
  details: GenericSimpleDescriptionDrink;
}

const DetailGenericDrink = ({ details }: DetailGenericDrinkProps) => {
  const { height } = useWindowDimensions();
  const { selectedLanguage } = useLanguage();
  const { theme, colorScheme } = useTheme();
  const { dispatch } = useOrder();

  const styles = createStyles(theme, colorScheme);

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 60 }}>
      {details?.imageUrl && (
        <Animated.View
          entering={FadeInUp.duration(700).delay(100).easing(Easing.ease)}
          style={[
            styles.imageContainer,
            {
              height: height - 150,
            },
          ]}
        >
          <Animated.Image
            source={{ uri: details?.imageUrl }}
            style={styles.image}
          />
        </Animated.View>
      )}

      <View style={styles.content}>
        <View style={styles.contentLeft}>
          <Text style={styles.title}>
            {details.identifierNumber} -{" "}
            {details.title[selectedLanguage?.id ?? "es"] || details.title.es}
          </Text>
          {details?.description && (
            <Text style={styles.description}>
              {details.description[selectedLanguage?.id ?? "es"] ||
                details.description.es}
            </Text>
          )}
        </View>
        <View style={styles.contentRight}>
          <Pressable
            android_ripple={{ color: theme?.text }}
            style={styles.orderButton}
            onPress={() =>
              dispatch({ payload: details, type: ORDER_REDUCER_TYPES.ADD })
            }
          >
            <Text style={{ color: theme?.text, fontSize: 20 }}>
              ADD TO YOUR ORDER LIST
            </Text>
          </Pressable>
          <Text style={styles.ingredientsTitle}>Ingredientes</Text>
          <View style={styles.ingredientsContainer}>
            {details?.ingredients?.length > 0
              ? details?.ingredients.map((ingredient, index) => {
                  return (
                    <Animated.View
                      entering={FadeIn.duration(500).delay(index * 300)}
                      key={ingredient._id}
                      style={styles.badge}
                    >
                      <Text style={styles.ingredientName}>
                        {ingredient.name[selectedLanguage?.id || "es"] ||
                          ingredient.name.es}
                      </Text>
                    </Animated.View>
                  );
                })
              : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailGenericDrink;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    imageContainer: {
      width: "100%",
      boxShadow: `0 2px 10px 1px ${
        colorScheme === "dark" ? "rgba(255,255,255, 0.5)" : "rgba(0,0,0, 0.5)"
      }`,
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
      marginHorizontal: 50,
    },
    badge: {
      padding: 12,
      borderRadius: 20,
      backgroundColor: colorScheme === "dark" ? theme.text : theme.tint,
      flexShrink: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    ingredientName: {
      textAlign: "center",
      fontSize: 18,
      color: theme.background,
    },
    ingredientsTitle: {
      color: theme?.text,
      fontSize: 28,
      textAlign: "center",
      textDecorationLine: "underline",
      marginBottom: 20,
    },
    orderButton: {
      minWidth: 100,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 50,
      padding: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.text,
      marginHorizontal: "auto",
    },
  });
