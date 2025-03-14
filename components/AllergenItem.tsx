import { StyleSheet, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import { Allergen } from "@/lib/sanity/httpSanity";
import { useTextTranslation } from "@/hooks/useTranslation";

const AllergenItem = ({ allergen }: { allergen: Allergen }) => {
  const { translateInAppText } = useTextTranslation();
  const { theme, colorScheme } = useTheme();

  const styles = createStyles(theme, colorScheme);

  return (
    <View>
      <Text style={styles.allergenName}>{translateInAppText(allergen)}</Text>
    </View>
  );
};

export default AllergenItem;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    allergenName: {
      textAlign: "center",
      fontSize: 18,
      color: theme.text,
    },
  });
