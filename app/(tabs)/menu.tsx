import LoadingIndicator from "@/components/LoadingIndicator";
import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Animated from "react-native-reanimated";
import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { useDishes } from "@/context/Dishes";
import { ColorScheme, useTheme } from "@/context/Theme";
import { Category, fetchCategories } from "@/lib/sanity/httpSanity";
import { isMobile, lineHeight } from "@/utils/utils";


const CARD_WIDTH = isMobile ? 320 : 550;
const CARD_HEIGHT = isMobile ? 200 : 300;

export default function MenuScreen() {
  const { theme, colorScheme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const { dishes } = useDishes();

  const [categories, setCategories] = useState<Category[]>();
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => dish.categoryNumber === selectedCategory);
  }, [dishes, selectedCategory]);

  const styles = createStyles(theme, colorScheme);
  
  useEffect(() => {
    fetchCategories()
      .then((res) => {
        setCategories(res.sort((a, b) => a.categoryNumber - b.categoryNumber));
        setSelectedCategory(res[0]?.categoryNumber);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
     <LoadingIndicator size={"large"} color={theme?.tint}  />
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
          ListEmptyComponent={() => (<Text>Questo si renderizza quando non ci sono elementi nell'array categories</Text>)}
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
                <Animated.Image
                  source={{ uri: item.imageUrl }}
                  style={styles.image}
                  sharedTransitionTag={"dishImage"}
                />
                <LinearGradient
                  colors={[
                    "transparent",
                    colorScheme === "light"
                      ? "rgba(115, 115, 115, 0.6)"
                      : "rgba(150, 150, 150, 0.6)",
                  ]}
                  start={{ x: 1, y: 0 }}
                  style={styles.overlay}
                />
                {item.isHighlighted && (
                  <Ionicons
                    style={styles.highlighted}
                    name="star-sharp"
                    size={30}
                    color={theme?.tint}
                  />
                )}
                <View style={styles.textContainer}>
                  <Text style={styles.number}>{item.dishNumber}</Text>
                  <Text style={styles.title}>
                    {item.title[
                      selectedLanguage?.id as keyof typeof item.title
                    ] ?? item.title.es}
                  </Text>
                </View>
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
      overflow: "hidden",
      elevation: Constants.platform?.android ? 3 : 0,
      boxShadow: `0px 0px 10px 0px ${
        colorScheme === "dark"
          ? "rgba(145, 145, 145, 0.5)"
          : "rgba(0, 0, 0, 0.5)"
      }`,
      position: "relative",
    },
    highlighted: {
      position: "absolute",
      right: 25,
      top: 25,
      padding: 5,
      borderRadius: 100,
      backgroundColor: "white",
    },
    overlay: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    textContainer: {
      flex: 1,
      justifyContent: "space-around",
      width: "50%",
      height: 0.6 * CARD_HEIGHT,
      position: "absolute",
      bottom: 25,
      left: 25,
    },
    number: {
      textAlign: "left",
      fontSize: 35,
      fontWeight: "900",
      color: theme?.background,
    },
    title: {
      color: theme?.background,
      textAlign: "left",
      fontSize: 30,
      fontWeight: "500",
      letterSpacing: 2,
      lineHeight: lineHeight(20),
    },
  });
