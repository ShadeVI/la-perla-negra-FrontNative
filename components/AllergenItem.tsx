import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import { Allergen } from "@/lib/sanity/httpSanity";
import { useTextTranslation } from "@/hooks/useTranslation";
import { ALLERGENS } from "@/constants/AllergensMapper";

const AllergenItem = ({ allergen }: { allergen: Allergen }) => {
  const { translateInAppText } = useTextTranslation();
  const { theme, colorScheme } = useTheme();

  const styles = createStyles(theme, colorScheme);
  const imgSrc = ALLERGENS[allergen].src;

  return (
    <View style={styles.itemWrapper}>
      <Image source={imgSrc} style={{ width: 40, height: 40 }} />
      <Text style={styles.allergenName}>{translateInAppText(allergen)}</Text>
    </View>
  );
};

export default AllergenItem;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    itemWrapper: {
      gap: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    allergenName: {
      textAlign: "center",
      fontSize: 18,
      color: theme.text,
    },
  });
