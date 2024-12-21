import { client } from "@/lib/sanity/sanity";
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
      <Text>Menu Page</Text>
      <FlatList
        data={dishes}
        renderItem={({ item }) => {
          
          return <Text key={item}>
          {item}</Text>;
        }}
        keyExtractor={(item) => item}
        ListEmptyComponent={<Text>No items</Text>}
        
      />
    </View>
  );
}

const styles = StyleSheet.create({});
