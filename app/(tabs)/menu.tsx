import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
} from "react-native";

import { Link, useRouter } from "expo-router";
import { Category, fetchCategories } from "@/lib/sanity/httpSanity";
import { useDishes } from "@/context/Dishes";
import Animated from "react-native-reanimated";

export default function MenuScreen() {
  const { theme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const { dishes } = useDishes();
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );
  const filteredDishes = [
    ...dishes.filter((dish) => dish.categoryNumber === selectedCategory),
  ];

  const styles = createStyles(theme);

  useEffect(() => {
    fetchCategories().then((res) => {
      setCategories(res.sort((a, b) => a.categoryNumber - b.categoryNumber));
    });
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0].categoryNumber);
    }
  }, [categories]);

  return (
    <View style={styles.pageContainer}>
      {/*CATEGORIES_HEADER */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
          }}
          style={{
            backgroundColor: theme?.tint,
            height: 100,
            paddingVertical: 20,
            borderBottomColor: "black",
            borderBottomWidth: 2,
          }}
          data={categories}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => setSelectedCategory(item.categoryNumber)}
              >
                <View
                  style={{
                    padding: 15,
                    backgroundColor: theme?.background,
                    minWidth: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{
                      color: theme?.text,
                      textAlign: "center",
                      fontSize: 20,
                    }}
                    key={item._id}
                  >
                    {item.title[selectedLanguage?.id as string] ??
                      item.title.es}
                  </Text>
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item._id}
          horizontal
        />
      </View>
      {/* DISHES_LIST EXAMPLE */}
      <View style={styles.listContainer}>
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={styles.flatList}
          data={filteredDishes}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => router.push(`/details/${item._id}`)}>
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
            );
          }}
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

const createStyles = (theme: typeof Colors.light | undefined = Colors.light) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
    listContainer: {
      flex: 1,
      backgroundColor: theme.background,
      justifyContent: "center",
      alignItems: "center",
    },
    flatList: {
      padding: 50,
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 50,
    },
    card: {
      width: 550,
      height: 300,
      borderRadius: 10,
      backgroundColor: theme?.icon,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      overflow: "hidden",
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
