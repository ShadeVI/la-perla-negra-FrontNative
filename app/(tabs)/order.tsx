import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { ORDER_REDUCER_TYPES, useOrder } from "@/context/Order";
import { ColorScheme, useTheme } from "@/context/Theme";
import { SanityReturnData } from "@/lib/sanity/httpSanity";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const order = () => {
  const { selectedLanguage } = useLanguage();
  const { orders, dispatch } = useOrder();
  const { theme, colorScheme } = useTheme();

  const groupedOrdersByName = orders.reduce((acc, currElem) => {
    if (acc[currElem._id]) {
      acc[currElem._id] = {
        ...acc[currElem._id],
        sum: (acc[currElem._id].sum += 1),
      };
    } else {
      acc[currElem._id] = {
        data: currElem,
        sum: 1,
      };
    }
    return acc;
  }, {} as { [key: string]: { sum: number; data: SanityReturnData } });

  const styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: theme?.text,
          fontSize: 32,
          marginTop: 100,
          marginBottom: 50,
        }}
      >
        Your Order:
      </Text>
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 15,
        }}
        style={{
          maxWidth: "60%",
        }}
      >
        {Object.entries(groupedOrdersByName).map((elem) => {
          const [id, content] = elem;
          return (
            <View
              key={id}
              style={{
                flexDirection: "row",
                width: "100%",
                marginHorizontal: "auto",
                gap: 10,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginHorizontal: "auto",
                  gap: 10,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: theme?.text,
                    fontSize: 26,
                    fontWeight: "bold",
                  }}
                >
                  {content.sum}
                </Text>
                <Text style={{ color: theme?.text, fontSize: 18 }}>x</Text>
                <Text style={{ color: theme?.text, fontSize: 20 }}>
                  {content.data.title[selectedLanguage?.id ?? "es"]}
                </Text>
              </View>
              <Pressable
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: theme?.text,
                  borderRadius: 10,
                  backgroundColor: theme?.gray,
                  minWidth: 120,
                }}
                onPress={() =>
                  dispatch({
                    payload: content.data,
                    type: ORDER_REDUCER_TYPES.ADD,
                  })
                }
              >
                <Text
                  style={{
                    color: theme?.text,
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Add
                </Text>
              </Pressable>
              <Pressable
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: theme?.text,
                  borderRadius: 10,
                  backgroundColor: theme?.gray,
                  minWidth: 120,
                }}
                onPress={() =>
                  dispatch({
                    payload: content.data,
                    type: ORDER_REDUCER_TYPES.REMOVE,
                  })
                }
              >
                <Text
                  style={{
                    color: theme?.text,
                    fontSize: 20,
                    textAlign: "center",
                  }}
                >
                  Remove
                </Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default order;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme?.background,
    },
  });
