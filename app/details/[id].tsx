import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const Details = () => {
  const params = useLocalSearchParams();
  console.log(params);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "black" }}>{params.id} aaa</Text>
    </View>
  );
};
export default Details;
const styles = StyleSheet.create({});
