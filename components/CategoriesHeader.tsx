import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import {
  Pressable,
  ViewStyle,
  StyleProp,
  Text,
  View,
  FlatList,
  StyleSheet,
  TextStyle,
} from "react-native";
import { PressableProps } from "react-native-gesture-handler";
import { useLanguage } from "@/context/Language";
import { useDevice } from "@/hooks/useResponsive";
import { Category } from "@/lib/sanity/httpSanity";
interface ExtraStyles {
  viewContainer?: StyleProp<ViewStyle>;
  pressableContainer?: StyleProp<PressableProps>;
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

  const styles = createStyles(
    theme,
    colorScheme,
    isTablet,
    selectedCategory,
    extraStyles
  );

  return (
    <View style={[styles.categoriesWrapper, extraStyles?.viewContainer]}>
      <FlatList
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesList}
        data={categories}
        ListEmptyComponent={() => <Text>No categories found</Text>}
        renderItem={({ item }) => (
          <Pressable
            key={item._id}
            onPress={() => onPressHandler(item.categoryNumber)}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <View style={[styles.categoryButton]}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item.categoryNumber && {
                    fontWeight: "bold",
                  },
                ]}
              >
                {item.title[selectedLanguage?.id as string] ?? item.title.es}
              </Text>
              <View
                style={[
                  styles.underline,
                  selectedCategory === item.categoryNumber && { bottom: 20 },
                ]}
              />
            </View>
          </Pressable>
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
  selectedCategory: number | undefined,
  extraStyles?: ExtraStyles
) =>
  StyleSheet.create({
    categoriesWrapper: {
      height: isTablet ? 100 : 80,
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10,
      backgroundColor: theme?.gray,
    },
    categoriesList: {
      borderBottomColor: theme?.text,
      borderBottomWidth: StyleSheet.hairlineWidth,
      boxShadow: `0px 0px 10px 0px ${
        colorScheme === "dark"
          ? "rgba(148, 148, 148, 0.55)"
          : "rgba(0, 0, 0, 0.75)"
      }`,
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
      paddingBottom: isTablet ? 15 : 10,
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
      width: "100%",
      marginHorizontal: 5,
      bottom: -20,
      right: 0,
      left: 0,
      backgroundColor: theme?.text,
    },
  });
