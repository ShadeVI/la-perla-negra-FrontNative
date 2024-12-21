import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
const Details = () => {
  const params = useLocalSearchParams();
  console.log(params);
  return (
    <View>
      <Text>Details</Text>
    </View>
  );
};
export default Details;
const styles = StyleSheet.create({});
