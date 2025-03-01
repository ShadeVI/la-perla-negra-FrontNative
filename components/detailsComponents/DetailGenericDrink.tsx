import React from "react";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { ColorScheme, useTheme } from "@/context/Theme";
import { GenericSimpleDescriptionDrink } from "@/lib/sanity/httpSanity";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { Easing, FadeInUp } from "react-native-reanimated";
import { ORDER_REDUCER_TYPES, useOrder } from "@/context/Order";
import GenericPressableButtton from "../GenericPressableButtton";
import IngredientsSection from "../IngredientsSection";
import { useTextTranslation } from "@/hooks/useTranslation";
import { currenciesConverter } from "@/utils/utils";
import { createPortableTextConfig } from "@/constants/PortableText";
import { PortableText } from "@portabletext/react-native";

interface DetailGenericDrinkProps {
  details: GenericSimpleDescriptionDrink;
}

const DetailGenericDrink = ({ details }: DetailGenericDrinkProps) => {
  const { height } = useWindowDimensions();
  const { selectedLanguage } = useLanguage();
  const { theme, colorScheme } = useTheme();
  const { dispatch } = useOrder();
  const { translateInAppText } = useTextTranslation();

  const styles = createStyles(theme, colorScheme);

  return (
    <ScrollView style={styles.scrollContainer}>
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
    </ScrollView>
  );
};

export default DetailGenericDrink;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    scrollContainer: {
      backgroundColor: theme?.background,
    },
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
