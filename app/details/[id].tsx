import DetailDish from "@/components/detailsComponents/DetailDish";
import DetailGenericDrink from "@/components/detailsComponents/DetailGenericDrink";
import DetailWine from "@/components/detailsComponents/DetailWine";
import { Colors } from "@/constants/Colors";
import { useData } from "@/context/Data";
import { useTheme } from "@/context/Theme";
import { useTextTranslation } from "@/hooks/useTranslation";
import {
  Dish,
  Drink,
  Wine,
  Beer,
  Cocktail,
  GenericSimpleDescriptionDrink,
  SanityDocumentTypes,
} from "@/lib/sanity/httpSanity";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Details = () => {
  const params = useLocalSearchParams();
  const { data } = useData();
  const { theme } = useTheme();
  const { translateCMSText, translateInAppText } = useTextTranslation();

  const details: Dish | Wine | undefined = data.find(
    (item) => item._id === params.id
  );

  const styles = createStyles(theme);

  if (!details) {
    return <Text>{translateInAppText("no-data-found")}</Text>;
  }

  const renderer = (item: Dish | Wine | Drink | Beer | Cocktail) => {
    if (!item) return <Text>{translateInAppText("no-data-found")}</Text>;
    switch (item._type) {
      case SanityDocumentTypes.DISH:
        return <DetailDish details={item as Dish} />;
      case SanityDocumentTypes.WINE:
        return <DetailWine details={item as Wine} />;
      case SanityDocumentTypes.BEER:
      case SanityDocumentTypes.DRINK:
      case SanityDocumentTypes.COCKTAIL:
      case SanityDocumentTypes.COFFEE:
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
    <View style={styles.scrollContainer}>
      <Stack.Screen
        options={{
          headerTitle: `${details.identifierNumber} - ${translateCMSText(
            details.title
          )}`,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: theme?.gray },
          headerRight: () =>
            details.isHighlighted ? (
              <View>
                <Ionicons name="star-sharp" size={30} color={theme?.tint} />
              </View>
            ) : null,
          headerTintColor: theme?.text,
          headerTransparent: true,
        }}
      />
      {renderer(details)}
    </View>
  );
};
export default Details;

const createStyles = (theme = Colors.light) =>
  StyleSheet.create({
    scrollContainer: {
      flex: 1,
    },
  });
