import DetailDish from "@/components/detailsComponents/DetailDish";
import DetailGenericDrink from "@/components/detailsComponents/DetailGenericDrink";
import DetailDrink from "@/components/detailsComponents/DetailGenericDrink";
import DetailWine from "@/components/detailsComponents/DetailWine";
import { Colors } from "@/constants/Colors";
import { useData } from "@/context/Data";
import { useTheme } from "@/context/Theme";
import {
  Dish,
  Drink,
  Wine,
  Beer,
  Cocktail,
  Coffee,
  GenericSimpleDescriptionDrink,
} from "@/lib/sanity/httpSanity";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Details = () => {
  const params = useLocalSearchParams();
  const { data } = useData();
  const { theme } = useTheme();

  const details: Dish | Wine | undefined = data.find(
    (item) => item._id === params.id
  );

  const styles = createStyles(theme);

  if (!details) {
    return <Text>No data found.</Text>;
  }

  const renderer = (item: Dish | Wine | Drink | Beer | Cocktail) => {
    if (!item) return <Text>No data found.</Text>;
    switch (item._type) {
      case "dish":
        return <DetailDish details={item as Dish} />;
      case "wine":
        return <DetailWine details={item as Wine} />;
      case "drink":
      case "beer":
      case "cocktail":
      case "coffee":
        return (
          <DetailGenericDrink details={item as GenericSimpleDescriptionDrink} />
        );

      default:
        return (
          <View>
            <Text style={{ color: theme?.text, textAlign: "center" }}>
              No View Created.
            </Text>
          </View>
        );
    }
  };

  return (
    <ScrollView style={styles.scrollContainer}>{renderer(details)}</ScrollView>
  );
};
export default Details;

const createStyles = (theme = Colors.light) =>
  StyleSheet.create({
    scrollContainer: {
      backgroundColor: theme?.background,
    },
  });
