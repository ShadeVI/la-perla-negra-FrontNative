import LoadingIndicator from "@/components/LoadingIndicator";
import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import { useEffect, useMemo, useState } from "react";
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
import { Category, fetchCategories } from "@/lib/sanity/httpSanity";
import { PressableProps } from "react-native-gesture-handler";
import { useLanguage } from "@/context/Language";
import { useIsTablet } from "@/hooks/useResponsive";

interface ExtraStyles {
  viewContainer?: StyleProp<ViewStyle>;
  pressableContainer?: StyleProp<PressableProps>;
  text?: StyleProp<TextStyle>;
}
interface CategoriesHeaderProps {
  setDefaultCategory?: (categoryId: number) => void;
  onPressHandler: (categoryId: number) => void;
  extraStyles?: ExtraStyles;
}

const CategoriesHeader = ({
  setDefaultCategory,
  onPressHandler,
  extraStyles,
}: CategoriesHeaderProps) => {
  const { theme, colorScheme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const { isTablet } = useIsTablet();
  const styles = createStyles(theme, colorScheme, isTablet, extraStyles);
  const [categories, setCategories] = useState<Category[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCategories()
      .then((res) => {
        setCategories(res.sort((a, b) => a.categoryNumber - b.categoryNumber));
        typeof setDefaultCategory === "function" &&
          setDefaultCategory(res[0]?.categoryNumber);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <LoadingIndicator size={"large"} color={theme?.tint} />;
  }

  return (
    <View style={[styles.categoriesWrapper, extraStyles?.viewContainer]}>
      <FlatList
        contentContainerStyle={styles.categoriesContainer}
        style={styles.categoriesList}
        data={categories}
        ListEmptyComponent={() => (
          <Text>
            Questo si renderizza quando non ci sono elementi nell'array
            categories
          </Text>
        )}
        renderItem={({ item }) => (
          <Pressable
            key={item._id}
            onPress={() => onPressHandler(item.categoryNumber)}
            style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}
          >
            <View style={styles.categoryButton}>
              <Text style={styles.categoryText}>
                {item.title[selectedLanguage?.id as string] ?? item.title.es}
              </Text>
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
  extraStyles?: ExtraStyles
) =>
  StyleSheet.create({
    categoriesWrapper: {
      height: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    categoriesList: {
      backgroundColor: theme?.tint,
      paddingVertical: 20,
      borderBottomColor: "black",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    categoriesContainer: {
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 15,
      gap: isTablet ? 25 : 15,
    },
    categoryButton: {
      padding: 15,
      backgroundColor: theme?.background,
      minWidth: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      boxShadow: `0px 0px 10px 0px ${
        colorScheme === "dark"
          ? "rgba(0, 0, 0, 0.75)"
          : "rgba(148, 148, 148, 0.55)"
      }`,
    },
    categoryText: {
      color: theme?.text,
      textAlign: "center",
      fontSize: isTablet ? 20 : 16,
    },
  });
