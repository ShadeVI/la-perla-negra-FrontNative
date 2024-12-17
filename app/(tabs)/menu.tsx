import { client } from "@/lib/sanity";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";

export default function TabTwoScreen() {
  const [dishes, setDishes] = useState([]);

  /* useEffect(() => {
    const fetchDishes = async () => {
      return await client.fetch('*[_type == "dish"]');
    };
    fetchDishes().then((res) => setDishes(res));
  }, []); */

  return (
    <View>
      <Text>Menu</Text>
      <FlatList
        data={dishes}
        renderItem={({ item }) => {
          return <Text key={item._id}>{item.title.es}</Text>;
        }}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>No items</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
