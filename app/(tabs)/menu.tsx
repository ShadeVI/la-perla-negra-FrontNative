import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
} from "react-native";

import { Link, useRouter } from "expo-router";

const mockCategories = [
  {
    _id: "4a205209-012a-44da-8915-b9c915265180",
    title: {
      es: "Entrantes",
      en: "Starters",
      de: "Starters",
      _type: "localeString",
    },
    slug: "entrantes",
    categoryNumber: 1,
  },
  {
    _id: "4a205209-012a-44da-8915-k286893m283",
    title: {
      es: "Primeros",
      en: "First",
      de: "Erste",
      _type: "localeString",
    },
    slug: "primeros",
    categoryNumber: 2,
  },
  {
    _id: "4a205209-012a-44da-8915-9d8d8d8d8d8",
    title: {
      es: "Segundos",
      en: "Seconds",
      de: "Zweite",
      _type: "localeString",
    },
    slug: "segundos",
    categoryNumber: 3,
  },
  {
    _id: "4a205209-012a-44da-8915-9d8d88sk928",
    title: {
      es: "Postres",
      en: "Desserts",
      de: "Nachspeisen",
      _type: "localeString",
    },
    slug: "postres",
    categoryNumber: 5,
  },
  {
    _id: "4a205209-012a-44da-8915-928328sk928",
    title: {
      es: "Pizzas",
      en: "Pizzas",
      de: "Pizzen",
      _type: "localeString",
    },
    slug: "pizza-fresca",
    categoryNumber: 5,
  },
];

type MockDish = (typeof mockeDishes)[0];
const mockeDishes = [
  {
    _id: "1be64d1c-da84-4f1d-a81e-7fc91a77d2a8",
    title: {
      es: "Carbonara pizza ES",
      en: "Carbonara pizza EN",
      de: "Pizza Carbonara DE",
      _type: "localeString",
    },
    description: {
      es: "Pizza artesanala con huevo, panceta y queso",
      en: "Handmade pizza with egg, bacon and cheese",
      de: "Handgemachte Pizza mit Ei, Speck und Käse",
      _type: "localeString",
    },
    imageUrl:
      "https://cdn.sanity.io/images/9qxh7wk9/development/284c48aa360daaabd566cbb73ee76156d9a15b3e-1600x1067.jpg",
    slug: "pizza-carbonara",
    price: 11.9,
    category: {
      slug: "pizza-fresca",
      categoryNumber: 4,
    },
    dishNumber: 1,
    isHighlighted: true,
    ingredients: [
      {
        name: {
          es: "Huevo",
          en: "Egg",
          de: "Ei",
          _type: "localeString",
        },
      },
      {
        name: {
          es: "Panceta",
          en: "Bacon",
          de: "Speck",
          _type: "localeString",
        },
      },
      {
        name: {
          es: "Queso",
          en: "Cheese",
          de: "Käse",
          _type: "localeString",
        },
      },
    ],
  },
];

const mockedDishesRepeated: MockDish[] = new Array(10)
  .fill(mockeDishes[0])
  .map((dish, index) => ({
    ...dish,
    _id: `${dish._id}-${index}`,
    dishNumber: index + 1,
  }));

type TitleLanguage = keyof (typeof mockCategories)[0]["title"];

export default function TabTwoScreen() {
  const [dishes, setDishes] = useState(mockedDishesRepeated);
  const { selectedLanguage } = useLanguage();
  const { theme } = useTheme();
  const router = useRouter();

  const styles = createStyles(theme);

  /* useEffect(() => {
    const fetchDishes = async () => {
      return await client.fetch('*[_type == "dish"]');
    };
    fetchDishes().then((res) => setDishes(res));
  }, []); */

  return (
    <View style={styles.pageContainer}>
      {/*CATEGORIES_HEADER */}
      <View
        style={{
          backgroundColor: "yellow",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          contentContainerStyle={{
            width: "100%",
            alignItems: "center",
            justifyContent: "space-around",
            gap: "20",
          }}
          style={{
            backgroundColor: "blue",
            height: 60,
            padding: 10,
          }}
          data={mockCategories}
          renderItem={({ item }) => {
            return (
              <Pressable onPress={() => console.log("pressed", { item })}>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: "white",
                    minWidth: 100,
                    width: 120,
                    maxWidth: 150,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text
                    style={{ color: "black", textAlign: "center" }}
                    key={item._id}
                  >
                    {item.title[selectedLanguage?.id as TitleLanguage] ||
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
          data={dishes}
          renderItem={({ item }) => {
            return (
              <Link href={`/details/${item._id}`}>
                <View style={styles.card}>
                  <Text style={styles.text} key={item._id}>
                    {item.title[selectedLanguage?.id as TitleLanguage] ||
                      item.title.es}
                  </Text>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.backgroundImageCard}
                  />
                </View>
              </Link>
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
      paddingVertical: 50,
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 50,
    },
    card: {
      width: 550,
      height: 250,
      borderRadius: 10,
      backgroundColor: theme?.icon,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      overflow: "hidden",
    },
    backgroundImageCard: {
      width: 250,
      height: "100%",
      objectFit: "cover",
    },
    text: {
      color: theme?.background,
      textAlign: "center",
      marginHorizontal: "auto",
      fontSize: 26,
    },
  });
