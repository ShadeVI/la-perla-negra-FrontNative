import DetailDish from "@/components/detailsComponents/DetailDish";
import DetailWine from "@/components/detailsComponents/DetailWine";
import { Colors } from "@/constants/Colors";
import { useDishes } from "@/context/Dishes";
import { useTheme } from "@/context/Theme";
import { Dish, Wine } from "@/lib/sanity/httpSanity";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Details = () => {
  const params = useLocalSearchParams();
  const { dishes } = useDishes();
  const { theme } = useTheme();

  const details: Dish | Wine | undefined = dishes.find(
    (item) => item._id === params.id
  );

  const styles = createStyles(theme);

  if (!details) {
    return <Text>No data found.</Text>;
  }

  const renderer = (item: Dish | Wine | undefined) => {
    if (!item) return <Text>No data found.</Text>;
    switch (item._type) {
      case "dish":
        return <DetailDish details={item as Dish} />;
      case "wine":
        return <DetailWine details={item as Wine} />;
      default:
        return <Text>No data found.</Text>;
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
