import { useLanguage } from "@/context/Language";
import { useOrder } from "@/context/Order";
import { SanityReturnData } from "@/lib/sanity/httpSanity";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const order = () => {
  const { selectedLanguage } = useLanguage();
  const { orders } = useOrder();

  const groupedOrdersByName = orders.reduce((acc, currElem) => {
    if (acc[currElem.title[selectedLanguage?.id ?? "es"]]) {
      acc[currElem.title[selectedLanguage?.id ?? "es"]] += 1;
    } else {
      acc[currElem.title[selectedLanguage?.id ?? "es"]] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });

  return (
    <View style={styles.container}>
      <Text style={{ marginTop: 100, marginBottom: 50 }}>Your Order is:</Text>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        {Object.entries(groupedOrdersByName).map(([title, number]) => {
          return (
            <View
              key={title}
              style={{
                flexDirection: "row",
                width: "100%",
                gap: 10,
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "bold",
                }}
              >
                {number}
              </Text>
              <Text style={{ fontSize: 18 }}>x</Text>
              <Text style={{ fontSize: 20 }}>{title}</Text>
            </View>
          );
        })}
      </ScrollView>
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
