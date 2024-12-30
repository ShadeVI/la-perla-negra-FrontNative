import React from "react";
import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import {
  ViewStyle,
  StyleProp,
  Text,
  View,
  FlatList,
  StyleSheet,
  TextStyle,
} from "react-native";
import { useLanguage } from "@/context/Language";
import { useDevice } from "@/hooks/useResponsive";
import { Category } from "@/lib/sanity/httpSanity";
import { CategoryItem } from "./CategoryItem";

interface ExtraStyles {
  viewContainer?: StyleProp<ViewStyle>;
  pressableContainer?: StyleProp<ViewStyle>;
  text?: StyleProp<TextStyle>;
}

interface CategoriesHeaderProps {
  selectedCategory: number | undefined;
  categories: Category[];
  onPressHandler: (categoryId: number) => void;
  extraStyles?: ExtraStyles;
}

const CategoriesHeader = ({
  selectedCategory,
  categories,
  onPressHandler,
  extraStyles,
}: CategoriesHeaderProps) => {
  const { theme, colorScheme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const { isTablet } = useDevice();

  const styles = createStyles(theme, colorScheme, isTablet, extraStyles);

  return (
    <View style={[styles.categoriesWrapper, extraStyles?.viewContainer]}>
      <FlatList
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesList}
        data={categories}
        ListEmptyComponent={() => <Text>No categories found</Text>}
        renderItem={({ item }) => (
          <CategoryItem
            item={item}
            isSelected={selectedCategory === item.categoryNumber}
            onPress={() => onPressHandler(item.categoryNumber)}
            languageId={selectedLanguage?.id}
          />
        )}
        keyExtractor={(item) => item._id}
        horizontal
      />
    </View>
  );
};

export default CategoriesHeader;

const createStyles = (
  theme: typeof Colors.light | undefined = Colors.light,
  colorScheme: ColorScheme,
  isTablet: boolean,
  extraStyles?: ExtraStyles
) =>
  StyleSheet.create({
    categoriesWrapper: {
      height: isTablet ? 90 : 80,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      backgroundColor: theme?.gray,
    },
    categoriesList: {
      borderBottomColor: theme?.text,
      borderBottomWidth: StyleSheet.hairlineWidth,
      shadowColor:
        colorScheme === "dark"
          ? "rgba(148, 148, 148, 0.55)"
          : "rgba(0, 0, 0, 0.75)",
      shadowOpacity: 0.75,
      shadowRadius: 10,
    },
    categoriesContainer: {
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 15,
      gap: isTablet ? 25 : 15,
    },
    categoryButton: {
      position: "relative",
      height: "100%",
      paddingHorizontal: 5,
      marginHorizontal: 10,
      minWidth: 100,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 0,
      borderBottomColor: theme?.text,
    },
    categoryText: {
      color: theme?.text,
      textAlign: "center",
      fontSize: isTablet ? 20 : 16,
    },
    underline: {
      position: "absolute",
      borderRadius: 5,
      height: 5,
      width: "50%",
      marginHorizontal: "auto",
      left: "25%",
      backgroundColor: theme?.text,
    },
  });
