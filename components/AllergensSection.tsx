import { StyleSheet, Text, View } from "react-native";
import { useTextTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import { Dish } from "@/lib/sanity/httpSanity";
import AllergenItem from "./AllergenItem";

interface AllergensSectionProps {
  allergens: Dish["allergens"];
}

const AllergensSection = ({ allergens }: AllergensSectionProps) => {
  const { translateInAppText } = useTextTranslation();
  const { theme, colorScheme } = useTheme();

  const styles = createStyles(theme, colorScheme);

  return (
    <View>
      <Text style={styles.allergenText}>{translateInAppText("allergens")}</Text>
      <View style={styles.allergensList}>
        {allergens.map((allergen) => {
          return <AllergenItem key={allergen} allergen={allergen} />;
        })}
      </View>
    </View>
  );
};

export default AllergensSection;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    allergenText: {
      color: theme?.text,
      fontSize: 28,
      textAlign: "center",
      textDecorationLine: "underline",
      marginBottom: 20,
    },
    allergensList: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: 15,
    },
  });
