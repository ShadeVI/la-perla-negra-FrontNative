
import CategoriesHeader from "@/components/CategoriesHeader";
import { useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
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
import { checkIfTablet, lineHeight } from "@/utils/utils";

export default function MenuScreen() {
  const { theme, colorScheme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const { dishes } = useDishes();
  const [isTablet, setIsTablet] = useState(false);
  

  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined>();

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => dish.categoryNumber === selectedCategory);
  }, [dishes, selectedCategory]);


  const onPressHandlerSelectedCategory = (categoryId: number) => {
    setSelectedCategory(categoryId)
  }

  const setDefaultCategory = (categoryId: number) => {
    setSelectedCategory(categoryId)
  }

  const styles = createStyles(theme, colorScheme, isTablet);

  return (
    <View style={styles.pageContainer}>
 
      
      <CategoriesHeader setDefaultCategory={setDefaultCategory} onPressHandler={onPressHandlerSelectedCategory} />


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
                <View
                  style={[
                    styles.textContainer,
                    {
                      height: 0.6 * (isTablet ? 300 : 200),
                    },
                  ]}
                >
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

const createStyles = (
  theme = Colors.light,
  colorScheme: ColorScheme,
  isTablet: boolean
) =>
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
      width: isTablet ? 550 : 320,
      height: isTablet ? 300 : 200,
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
      position: "absolute",
      bottom: 25,
      left: 25,
    },
    number: {
      textAlign: "left",
      fontSize: isTablet ? 35 : 25,
      fontWeight: "900",
      color: theme?.background,
    },
    title: {
      color: theme?.background,
      textAlign: "left",
      fontSize: isTablet ? 30 : 20,
      fontWeight: "500",
      letterSpacing: 2,
      lineHeight: isTablet ? lineHeight(20) : lineHeight(12),
    },
  });
