import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import { useTextTranslation } from "@/hooks/useTranslation";
import type { BaseData } from "@/lib/sanity/httpSanity";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface IngredientsListProps {
  ingredients: BaseData["ingredients"];
}

const IngredientsList = ({ ingredients }: IngredientsListProps) => {
  const { theme, colorScheme } = useTheme();
  const { translateCMSText } = useTextTranslation();
  const styles = createStyles(theme, colorScheme);
  return (
    <View style={styles.ingredientsContainer}>
      {ingredients.map((ingredient, index) => {
        return (
          <Animated.View
            entering={FadeIn.duration(500).delay(index * 300)}
            key={ingredient._id}
            style={styles.badge}
          >
            <Text style={styles.ingredientName}>
              {translateCMSText(ingredient.name)}
            </Text>
          </Animated.View>
        );
      })}
    </View>
  );
};

export default IngredientsList;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
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
  });
