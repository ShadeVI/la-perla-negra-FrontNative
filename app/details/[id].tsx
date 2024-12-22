import { useDishes } from "@/context/Dishes";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";

const Details = () => {
  const params = useLocalSearchParams();
  const { dishes } = useDishes();

  const detailsDish = dishes.find((dish) => dish._id === params.id);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "black" }}>{params.id} aaa</Text>
      <Animated.Image
        source={{ uri: detailsDish?.imageUrl }}
        style={{ width: 500, height: 500 }}
        sharedTransitionTag={"dishImage"}
      />
    </View>
  );
};
export default Details;
const styles = StyleSheet.create({});
