import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { ColorScheme, useTheme } from "@/context/Theme";
import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { Link } from "expo-router";
import { Category, fetchCategories } from "@/lib/sanity/httpSanity";
import { useDishes } from "@/context/Dishes";
import Animated from "react-native-reanimated";
import Constants from "expo-constants";
import { isMobile } from "@/utils/utils";

const CARD_WIDTH = isMobile ? 320 : 550;
const CARD_HEIGHT = isMobile ? 200 : 300;

export default function MenuScreen() {
  const { theme, colorScheme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const { dishes } = useDishes();

  const [categories, setCategories] = useState<Category[] | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => dish.categoryNumber === selectedCategory);
  }, [dishes, selectedCategory]);

  const styles = createStyles(theme, colorScheme);

  useEffect(() => {
    fetchCategories().then((res) => {
      if (res.length === 0) return;
      setCategories(res.sort((a, b) => a.categoryNumber - b.categoryNumber));
      setSelectedCategory(res[0]?.categoryNumber);
    });
  }, []);

  if (!categories) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme?.icon} />
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      {/*CATEGORIES_HEADER */}
      <View style={styles.categoriesWrapper}>
        <FlatList
          contentContainerStyle={styles.categoriesContainer}
          style={styles.categoriesList}
          data={categories}
          renderItem={({ item }) => (
            <Pressable
              key={item._id}
              onPress={() => setSelectedCategory(item.categoryNumber)}
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
      {/* DISHES_LIST */}
      <View style={styles.listContainer}>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={styles.flatListContainer}
          data={filteredDishes}
          renderItem={({ item }) => (
            <Link
              key={item._id}
              href={`/details/${item._id}` as "/details/:id"}
            >
              <View style={styles.card}>
                <View style={styles.textContainer}>
                  <Text style={styles.number}>{item.dishNumber}</Text>
                  <Text style={styles.title}>
                    {item.title[
                      selectedLanguage?.id as keyof typeof item.title
                    ] ?? item.title.es}
                  </Text>
                </View>
                <Animated.Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                  sharedTransitionTag={"dishImage"}
                />
              </View>
            </Link>
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

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    categoriesWrapper: {
      height: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    categoriesList: {
      backgroundColor: theme?.tint,
      paddingVertical: 20,
      borderBottomColor: "black",
      borderBottomWidth: 2,
    },
    categoriesContainer: {
      alignItems: "center",
      justifyContent: "space-around",
      paddingHorizontal: 15,
      gap: isMobile ? 15 : 25,
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
      fontSize: isMobile ? 16 : 20,
    },
    listContainer: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
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
      boxShadow: `0px 0px 10px 0px ${
        colorScheme === "dark" ? "rgba(145, 145, 145, 0.5)" : "rgba(0,0,0,0.5)"
      }`,
    },
    image: {
      width: "60%",
      height: "100%",
      objectFit: "cover",
    },
    textContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 15,
    },
    number: {
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold",
    },
    title: {
      color: theme?.background,
      textAlign: "center",
      fontSize: 26,
    },
  });
