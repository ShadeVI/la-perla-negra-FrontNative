import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { client } from "@/lib/sanity/sanity";
import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";

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
    categoryNumber: 4,
  },
];

const mockeDishes = [
  {
    id: "1",
    title: {
      _type: "localeString",
      es: "Prueba 1",
      en: "Test 1",
      de: "Test 1",
    },
  },
  {
    id: "2",
    title: {
      _type: "localeString",
      es: "Prueba 2",
      en: "Test 2",
      de: "Test 2",
    },
  },
  {
    id: "3",
    title: {
      _type: "localeString",
      es: "Prueba 3",
      en: "Test 3",
      de: "Test 3",
    },
  },
  {
    id: "4",
    title: {
      _type: "localeString",
      es: "Prueba 4",
      en: "Test 4",
      de: "Test 4",
    },
  },
  {
    id: "5",
    title: {
      _type: "localeString",
      es: "Prueba 5",
      en: "Test 5",
      de: "Test 5",
    },
  },
  {
    id: "6",
    title: {
      _type: "localeString",
      es: "Prueba 6",
      en: "Test 6",
      de: "Test 6",
    },
  },
  {
    id: "7",
    title: {
      _type: "localeString",
      es: "Prueba 7",
      en: "Test 7",
      de: "Test 7",
    },
  },
  {
    id: "8",
    title: {
      _type: "localeString",
      es: "Prueba 8",
      en: "Test 8",
      de: "Test 8",
    },
  },
  {
    id: "9",
    title: {
      _type: "localeString",
      es: "Prueba 9",
      en: "Test 9",
      de: "Test 9",
    },
  },
  {
    id: "10",
    title: {
      _type: "localeString",
      es: "Prueba 10",
      en: "Test 10",
      de: "Test 10",
    },
  },
];

type TitleLanguage = keyof (typeof mockCategories)[0]["title"];

export default function TabTwoScreen() {
  const [dishes, setDishes] = useState(mockeDishes);
  const { selectedLanguage } = useLanguage();
  const { theme } = useTheme();

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
      <FlatList
        data={dishes}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => console.log("pressed", { item })}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: theme?.background,
                  minWidth: 100,
                  width: 120,
                  maxWidth: 150,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: theme?.text, textAlign: "center" }}>
                  {item.title[selectedLanguage?.id as TitleLanguage] ||
                    item.title.es}
                </Text>
              </View>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: theme?.text }}>No dishes found</Text>
        }
        numColumns={2}
      />
    </View>
  );
}

const createStyles = (theme: typeof Colors.light | undefined = Colors.light) =>
  StyleSheet.create({
    pageContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
