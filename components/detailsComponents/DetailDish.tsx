import React from "react";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { ColorScheme, useTheme } from "@/context/Theme";
import { Dish } from "@/lib/sanity/httpSanity";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import Animated, { Easing, FadeIn, FadeInUp } from "react-native-reanimated";
import { ORDER_REDUCER_TYPES, useOrder } from "@/context/Order";
import { currenciesConverter } from "@/utils/utils";
import GenericPressableButtton from "../GenericPressableButtton";
import { useTextTranslation } from "@/hooks/useTranslation";
import IngredientsSection from "../IngredientsSection";
import { PortableText } from "@portabletext/react-native";
import { createPortableTextConfig } from "@/constants/PortableText";

interface DetailDishProps {
  details: Dish;
}

const DetailDish = ({ details }: DetailDishProps) => {
  const { height } = useWindowDimensions();
  const { selectedLanguage } = useLanguage();
  const { theme, colorScheme } = useTheme();
  const { dispatch } = useOrder();
  const { translateInAppText } = useTextTranslation();

  const styles = createStyles(theme, colorScheme);

  return (
    <View style={{ flex: 1, paddingVertical: 60 }}>
      <Animated.View
        entering={FadeInUp.duration(700).delay(100).easing(Easing.ease)}
        style={[styles.imageContainer, { height: height - 150 }]}
      >
        <Animated.Image
          source={{ uri: details?.imageUrl }}
          style={styles.image}
        />
      </Animated.View>
      <View style={styles.content}>
        <View style={styles.contentLeft}>
          <Text style={styles.title}>
            {details.identifierNumber} -{" "}
            {details.title[selectedLanguage?.id ?? "es"] || details.title.es}
          </Text>
          {details?.description && (
            <PortableText
              value={details?.description[selectedLanguage?.id ?? "es"] || []}
              components={createPortableTextConfig({
                theme: theme,
                colorScheme: colorScheme,
              })}
              onMissingComponent={false}
            />
          )}
          <Text style={styles.price}>{currenciesConverter(details.price)}</Text>
        </View>
        <View style={styles.contentRight}>
          <View style={styles.memoButtonsContainer}>
            <GenericPressableButtton
              text={translateInAppText("btn-add-memo").toUpperCase()}
              onPress={() =>
                dispatch({ payload: details, type: ORDER_REDUCER_TYPES.ADD })
              }
            />
          </View>
          {details?.ingredients?.length > 0 ? (
            <IngredientsSection ingredients={details.ingredients} />
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default DetailDish;

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
    price: {
      textAlign: "justify",
      fontSize: 25,
      marginTop: 20,
      color: theme?.text,
    },
    memoButtonsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "center",
      marginBottom: 30,
      gap: 20,
    },
  });
