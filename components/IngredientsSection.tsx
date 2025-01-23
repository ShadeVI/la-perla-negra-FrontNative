import { StyleSheet, Text, View } from "react-native";
import IngredientsList from "./IngredientsList";
import { useTextTranslation } from "@/hooks/useTranslation";
import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import { BaseData } from "@/lib/sanity/httpSanity";

interface IngredientsSectionProps {
  ingredients: BaseData["ingredients"];
}

const IngredientsSection = ({ ingredients }: IngredientsSectionProps) => {
  const { translateInAppText } = useTextTranslation();
  const { theme, colorScheme } = useTheme();

  const styles = createStyles(theme, colorScheme);

  return (
    <View>
      <Text style={styles.ingredientsText}>
        {translateInAppText("ingredients")}
      </Text>
      <IngredientsList ingredients={ingredients} />
    </View>
  );
};

export default IngredientsSection;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    ingredientsText: {
      color: theme?.text,
      fontSize: 28,
      textAlign: "center",
      textDecorationLine: "underline",
      marginBottom: 20,
    },
  });
