import CategoriesHeader from "@/components/CategoriesHeader";
import { useEffect, useMemo, useState } from "react";
import { StyleSheet, View, Text, FlatList, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { useData } from "@/context/Data";
import { useTheme } from "@/context/Theme";
import { SanityDocumentTypes, Wine, WineType } from "@/lib/sanity/httpSanity";
import LoadingIndicator from "@/components/LoadingIndicator";
import MenuCard from "@/components/MenuCard";
import { useTextTranslation } from "@/hooks/useTranslation";
import FilterWines from "@/components/FilterWines";
import { Ionicons } from "@expo/vector-icons";

export default function MenuScreen() {
  const { theme } = useTheme();
  const { data, categories, isLoading } = useData();
  const { translateInAppText } = useTextTranslation();
  const [selectedCategory, setSelectedCategory] = useState<
    number | undefined
  >();

  const [activeWineFilters, setActiveWineFilters] = useState<WineType[]>([]);
  const [showFilterWines, setShowFilterWines] = useState(false);

  const handleOnPressWineFilter = (filter: WineType | null) => {
    if (!filter) {
      setActiveWineFilters([]);
      return;
    }
    setActiveWineFilters((prev) => {
      if (prev.includes(filter)) {
        return prev.filter((item) => item !== filter);
      }
      return [...prev, filter];
    });
  };

  const filteredData = useMemo(() => {
    return data
      .filter((element) => element.categoryNumber === selectedCategory)
      .sort((a, b) => a.identifierNumber - b.identifierNumber);
  }, [selectedCategory]);

  const onPressHandlerSelectedCategory = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

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
        <Text>{translateInAppText("no-categories-found")}</Text>
      </View>
    );
  }

  useEffect(() => {
    if (!selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].identifierNumber);
    }
  }, [categories]);

  return (
    <View style={styles.pageContainer}>
      <CategoriesHeader
        selectedCategory={selectedCategory}
        categories={categories}
        onPressHandler={onPressHandlerSelectedCategory}
      />
      <View style={{ flex: 1 }}>
        {/** WINE FILTER WILL ONLY BE SHOWN FOR WINE TYPE */}
        {filteredData.length > 0 &&
          filteredData[0]._type === SanityDocumentTypes.WINE && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "stretch",
                paddingHorizontal: 50,
                height: 80,
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {showFilterWines && (
                  <FilterWines
                    filters={(filteredData as Wine[]).map((data) => data.type)}
                    onPress={handleOnPressWineFilter}
                    activeWineFilters={activeWineFilters}
                  />
                )}
              </View>
              <Pressable
                onPress={() => setShowFilterWines(!showFilterWines)}
                style={{
                  paddingHorizontal: 20,
                  alignSelf: "center",
                }}
              >
                <Ionicons name="filter" size={40} color={theme?.text} />
              </Pressable>
            </View>
          )}
        <FlatList
          contentContainerStyle={styles.flatListContainer}
          data={
            filteredData.some(
              (item) => item._type === SanityDocumentTypes.WINE
            ) && activeWineFilters.length > 0
              ? (filteredData as Wine[]).filter((item) =>
                  activeWineFilters.includes(item.type)
                )
              : filteredData
          }
          renderItem={({ item }) => (
            <MenuCard item={item} isSmall={true} isTablet />
          )}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <Text
              style={{ color: theme?.text, textAlign: "center", fontSize: 30 }}
            >
              {translateInAppText("no-data-found")}
            </Text>
          }
          numColumns={2}
          columnWrapperStyle={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "flex-start",
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
      flexDirection: "row",
      backgroundColor: theme.background,
    },
    flatListContainer: {
      padding: 50,
      gap: 50,
    },
  });
