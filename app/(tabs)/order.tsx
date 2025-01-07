import { StyleSheet, Text, View } from "react-native";
const order = () => {
  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center" }}>order</Text>
    </View>
  );
};
export default order;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
