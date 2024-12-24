import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";

import { useRouter } from "expo-router";
import { Category, fetchCategories } from "@/lib/sanity/httpSanity";
import { useDishes } from "@/context/Dishes";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";

const CARD_WIDTH = 550;
const CARD_HEIGHT = 300;

export default function MenuScreen() {
  const { theme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const { dishes } = useDishes();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => dish.categoryNumber === selectedCategory);
  }, [dishes, selectedCategory]);

  const styles = createStyles(theme);

  console.log("REDNER");

  useEffect(() => {
    fetchCategories().then((res) => {
      if (res.length === 0) return;
      setCategories(res.sort((a, b) => a.categoryNumber - b.categoryNumber));
      setSelectedCategory(res[0]?.categoryNumber);
    });
  }, []);

  return (
    <View style={styles.pageContainer}>
      {/*CATEGORIES_HEADER */}
      <View style={styles.categoriesWrapper}>
        <FlatList
          contentContainerStyle={styles.categoriesContainer}
          style={styles.categoriesList}
          data={categories}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelectedCategory(item.categoryNumber)}>
              <View style={styles.categoryButton}>
                <Text style={styles.categoryText} key={item._id}>
                  {item.title[selectedLanguage?.id as string] ?? item.title.es}
                </Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
          horizontal
        />
      </View>
      {/* DISHES_LIST */}
      <View style={styles.listContainer}>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContainer}
          data={filteredDishes}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push(`/details/${item._id}` as "/details/:id")
              }
            >
              <View style={styles.card}>
                <Text style={styles.text} key={item._id}>
                  {item.title[
                    selectedLanguage?.id as keyof typeof item.title
                  ] ?? item.title.es}
                </Text>
                <Animated.Image
                  source={{ uri: item.imageUrl }}
                  style={styles.backgroundImageCard}
                  sharedTransitionTag={"dishImage"}
                />
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <Text style={{ color: theme?.text }}>No dishes found</Text>
          }
          numColumns={2}
          columnWrapperStyle={{ gap: 50 }}
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
    categoriesWrapper: {
      justifyContent: "center",
      alignItems: "center",
    },
    categoriesList: {
      backgroundColor: theme?.tint,
      height: 100,
      paddingVertical: 20,
      borderBottomColor: "black",
      borderBottomWidth: 2,
    },
    categoriesContainer: {
      width: "100%",
      alignItems: "center",
      justifyContent: "space-around",
    },
    categoryButton: {
      padding: 15,
      backgroundColor: theme?.background,
      minWidth: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
    },
    categoryText: {
      color: theme?.text,
      textAlign: "center",
      fontSize: 20,
    },
    listContainer: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: "center",
      alignItems: "center",
    },
    flatList: {
      width: "100%",
    },
    flatListContainer: {
      padding: 50,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 50,
    },
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      borderRadius: 10,
      backgroundColor: theme?.icon,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      overflow: "hidden",
      elevation: Constants.platform?.android ? 3 : 0,
    },
    backgroundImageCard: {
      width: "50%",
      height: "100%",
      objectFit: "cover",
    },
    text: {
      flex: 1,
      color: theme?.background,
      textAlign: "center",
      marginHorizontal: "auto",
      fontSize: 26,
    },
  });
