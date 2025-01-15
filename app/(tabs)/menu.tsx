import CategoriesHeader from "@/components/CategoriesHeader";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { Colors } from "@/constants/Colors";
import { useData } from "@/context/Data";
import { useTheme } from "@/context/Theme";
import {
  Category,
  fetchCategories,
  SanityDocumentTypes,
} from "@/lib/sanity/httpSanity";
import LoadingIndicator from "@/components/LoadingIndicator";
import MenuCard from "@/components/MenuCard";

export default function MenuScreen() {
  const { theme } = useTheme();
  const { data } = useData();
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();
  const [categories, setCategories] = useState<Category[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const filteredDishes = useMemo(() => {
    return data
      .filter((dish) => dish.categoryNumber === selectedCategory)
      .sort((a, b) => a.identifierNumber - b.identifierNumber);
  }, [data, selectedCategory]);

  const onPressHandlerSelectedCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  const setDefaultCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  useEffect(() => {
    fetchCategories()
      .then((res) => {
        setCategories(
          res.sort((a, b) => a.identifierNumber - b.identifierNumber)
        );
        setDefaultCategory(res[0]?.identifierNumber);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  const styles = createStyles(theme);

  if (isLoading) {
    return (
      <View style={styles.pageContainer}>
        <LoadingIndicator size={"large"} color={theme?.tint} />
      </View>
    );
  }

  if (!categories) {
    return (
      <View style={styles.pageContainer}>
        <Text>No categories found</Text>
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <CategoriesHeader
        selectedCategory={selectedCategory}
        categories={categories}
        onPressHandler={onPressHandlerSelectedCategory}
      />
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={filteredDishes}
          renderItem={({ item }) => (
            <MenuCard
              item={item}
              isSmall={item._type === SanityDocumentTypes.DRINK}
            />
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <Text
              style={{ color: theme?.text, textAlign: "center", fontSize: 30 }}
            >
              No data found
            </Text>
          }
          numColumns={2}
          columnWrapperStyle={{
            gap: 50,
          }}
        />
      </View>
    </View>
  );
}

const createStyles = (theme = Colors.light) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    flatListContainer: {
      paddingVertical: 50,
      marginHorizontal: "auto",
      gap: 50,
    },
  });
