import { Pressable, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import Constants from "expo-constants";
import Animated from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useLanguage } from "@/context/Language";
import { SanityDocumentTypes, SanityReturnData } from "@/lib/sanity/httpSanity";
import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import { useDevice } from "@/hooks/useResponsive";
import { lineHeight } from "@/utils/utils";

interface MenuCardProps {
  item: SanityReturnData;
  isSmall?: boolean;
}

const MenuCard = ({ item, isSmall }: MenuCardProps) => {
  const { selectedLanguage } = useLanguage();
  const { theme, colorScheme } = useTheme();
  const { isTablet } = useDevice();

  const styles = createStyles(theme, colorScheme, isTablet);

  return (
    <Link
      key={item._id}
      href={`/details/${item._id}` as "/details/:id"}
      asChild
    >
      <Pressable>
        <View
          style={[styles.card, isSmall && { height: isTablet ? 150 : 100 }]}
        >
          <Animated.Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
          />
          <LinearGradient
            colors={[
              "transparent",
              colorScheme === "light"
                ? "rgba(115, 115, 115, 0.6)"
                : "rgba(150, 150, 150, 0.9)",
            ]}
            start={{ x: 1, y: 0 }}
            style={styles.overlay}
          />
          {item.isHighlighted && (
            <Ionicons
              style={styles.highlighted}
              name="star-sharp"
              size={30}
              color={theme?.tint}
            />
          )}
          <View style={styles.textContainer}>
            {item._type === SanityDocumentTypes.DISH && (
              <Text
                style={[styles.number, isSmall && isTablet && { fontSize: 25 }]}
              >
                {item.identifierNumber}
              </Text>
            )}
            <Text
              style={[
                styles.title,
                isSmall &&
                  isTablet && { fontSize: 22, lineHeight: lineHeight(15) },
              ]}
            >
              {item.title[selectedLanguage?.id || "es"] ?? item.title.es}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

export default MenuCard;

const createStyles = (
  theme = Colors.light,
  colorScheme: ColorScheme,
  isTablet: boolean
) =>
  StyleSheet.create({
    card: {
      borderRadius: 10,
      backgroundColor: theme?.icon,
      overflow: "hidden",
      elevation: Constants.platform?.android ? 3 : 0,
      boxShadow: `0px 0px 10px 0px ${
        colorScheme === "dark"
          ? "rgba(145, 145, 145, 0.5)"
          : "rgba(0, 0, 0, 0.5)"
      }`,
      position: "relative",
      width: 450,
      height: isTablet ? 300 : 200,
    },
    highlighted: {
      position: "absolute",
      right: 25,
      top: 25,
      padding: 5,
      borderRadius: 100,
      backgroundColor: "white",
    },
    overlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    textContainer: {
      flex: 1,
      justifyContent: "space-around",
      alignItems: "flex-start",
      width: "80%",
      position: "absolute",
      bottom: 25,
      left: 25,
      gap: 10,
    },
    number: {
      textAlign: "left",
      fontSize: isTablet ? 35 : 25,
      fontWeight: "900",
      color: theme?.background,
    },
    title: {
      color: theme?.background,
      textAlign: "left",
      fontSize: isTablet ? 30 : 20,
      fontWeight: "500",
      letterSpacing: 2,
      lineHeight: isTablet ? lineHeight(20) : lineHeight(12),
    },
  });
