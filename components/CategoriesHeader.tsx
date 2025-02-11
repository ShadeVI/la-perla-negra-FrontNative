import React, { useRef } from "react";
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
import { Category } from "@/lib/sanity/httpSanity";
import { CategoryItem } from "./CategoryItem";
import Animated from "react-native-reanimated";

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
  const scrollRef = useRef<FlatList>(null);
  const menuRef = useRef<View>(null);

  const styles = createStyles(theme, colorScheme);

  return (
    <Animated.View
      style={[styles.categoriesWrapper, extraStyles?.viewContainer]}
      ref={menuRef}
    >
      {/* 
        ******** This is a close button for the menu, NOT WORKING, Need to be implemented if customer need it ********
      <Pressable
        onPress={() => console.log("close menu", menuRef.current?.state)}
        style={{
          position: "absolute",
          right: 10,
          top: 0,
          zIndex: 800,
          padding: 10,
          backgroundColor: "blue",
        }}
      >
        <View>
          <Ionicons name="close" size={30} color={theme?.tint} />
        </View>
      </Pressable> */}
      <FlatList
        ref={scrollRef}
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesList}
        data={categories}
        ListEmptyComponent={() => <Text>No categories found</Text>}
        renderItem={({ item, index }) => (
          <CategoryItem
            item={item}
            isSelected={selectedCategory === item.identifierNumber}
            onPress={() => {
              scrollRef.current?.scrollToIndex({
                index: index - 3 < 0 ? 0 : index - 3,
                animated: true,
              });
              onPressHandler(item.identifierNumber);
            }}
            languageId={selectedLanguage?.id}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </Animated.View>
  );
};

export default CategoriesHeader;

const createStyles = (
  theme: typeof Colors.light | undefined = Colors.light,
  colorScheme: ColorScheme
) =>
  StyleSheet.create({
    categoriesWrapper: {
      width: 300,
      zIndex: 10,
      backgroundColor: theme?.gray,
      position: "relative",
    },
    categoriesList: {
      borderRightColor: theme?.text,
      borderRightWidth: StyleSheet.hairlineWidth,
      shadowColor:
        colorScheme === "dark"
          ? "rgba(148, 148, 148, 0.55)"
          : "rgba(0, 0, 0, 0.75)",
      shadowOpacity: 0.75,
      shadowRadius: 10,
    },
    categoriesContainer: {
      marginVertical: 25,
      paddingBottom: 50,
    },
  });
