import { Colors } from "@/constants/Colors";
import { createPortableTextConfig } from "@/constants/PortableText";
import { useLanguage } from "@/context/Language";
import { ORDER_REDUCER_TYPES, useOrder } from "@/context/Order";
import { ColorScheme, useTheme } from "@/context/Theme";
import { Wine } from "@/lib/sanity/httpSanity";
import { PortableText } from "@portabletext/react-native";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { Easing, FadeInUp } from "react-native-reanimated";
import GenericPressableButtton from "../GenericPressableButtton";
import { useTextTranslation } from "@/hooks/useTranslation";
import IngredientsSection from "../IngredientsSection";

interface DetailWineProps {
  details: Wine;
}

export const DetailWine = ({ details }: DetailWineProps) => {
  const { height } = useWindowDimensions();
  const { selectedLanguage } = useLanguage();
  const { theme, colorScheme } = useTheme();
  const { dispatch } = useOrder();
  const { translateInAppText } = useTextTranslation();

  const styles = createStyles(theme, colorScheme);

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 60,
      }}
    >
      {details?.imageUrl && (
        <Animated.View
          entering={FadeInUp.duration(700).delay(100).easing(Easing.ease)}
          style={[styles.imageContainer, { height: height - 150 }]}
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
          <PortableText
            value={details?.description[selectedLanguage?.id ?? "es"] || []}
            components={createPortableTextConfig({
              theme: theme,
              colorScheme: colorScheme,
            })}
            onMissingComponent={false}
          />
        </View>
        <View style={styles.contentRight}>
          <View
            style={[styles.imageVerticalContainer, { height: height - 150 }]}
          >
            <Image
              source={{ uri: details?.verticalImageUrl }}
              style={styles.imageVertical}
            />
          </View>
          <View style={[styles.memoButtonsContainer, { marginTop: 50 }]}>
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

export default DetailWine;

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
      marginTop: 50,
    },
    contentLeft: {
      flex: 1,
      paddingHorizontal: 30,
      paddingBottom: 20,
    },
    contentRight: {
      flex: 1,
      paddingHorizontal: 30,
    },
    imageVerticalContainer: {
      borderRadius: 10,
      width: 200,
      height: 500,
      marginHorizontal: "auto",
      overflow: "hidden",
      /* boxShadow: `0 0 10px 0 ${
        colorScheme === "dark"
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.5)"
      }`, */
    },
    imageVertical: {
      width: "100%",
      height: "100%",
      objectFit: "contain",
    },
    title: {
      fontSize: 30,
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

const createPortableTextStyles = (
  theme = Colors.light,
  colorScheme: ColorScheme,
  isTablet: boolean
) => StyleSheet.create({});
