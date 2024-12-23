import { useDishes } from "@/context/Dishes";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const Details = () => {
  const params = useLocalSearchParams();
  const { dishes } = useDishes();

  const detailsDish = dishes.find((dish) => dish._id === params.id);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
      }}
    >
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={{ width: "100%" }}>
          <Animated.Image
            source={{ uri: detailsDish?.imageUrl }}
            style={{
              width: "100%",
              height: 500,
              objectFit: "cover",
              marginHorizontal: "auto",
            }}
            sharedTransitionTag={"dishImage"}
          />
        </View>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
        <Text>HEHEHEHEHHEHE</Text>
      </ScrollView>
    </View>
  );
};
export default Details;
const styles = StyleSheet.create({});
