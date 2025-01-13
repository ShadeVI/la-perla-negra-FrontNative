import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { ORDER_REDUCER_TYPES, useOrder } from "@/context/Order";
import { ColorScheme, useTheme } from "@/context/Theme";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const order = () => {
  const { selectedLanguage } = useLanguage();
  const { order, dispatch } = useOrder();
  const { theme, colorScheme } = useTheme();

  const styles = createStyles(theme, colorScheme);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 50,
        }}
      >
        <Text
          style={{
            flexGrow: 1,
            textAlign: "center",
            color: theme?.text,
            fontSize: 40,
            marginTop: 50,
            marginBottom: 50,
          }}
        >
          Your Memo:
        </Text>
        <Pressable
          android_ripple={{ color: theme?.text }}
          style={{
            padding: 12,
            borderWidth: 1,
            borderColor: theme?.text,
            borderRadius: 10,
            backgroundColor: theme?.gray,
          }}
          onPress={() =>
            dispatch({ payload: null, type: ORDER_REDUCER_TYPES.RESET })
          }
        >
          <Text
            style={{
              color: theme?.text,
              fontSize: 20,
            }}
          >
            Reset memo
          </Text>
        </Pressable>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 50,
          gap: 15,
        }}
        style={{
          paddingHorizontal: "5%",
        }}
      >
        {Object.entries(order).map((elem) => {
          const [id, content] = elem;
          return (
            <View
              key={id}
              style={{
                flexDirection: "row",
                width: "100%",
                marginHorizontal: "auto",
                gap: 20,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Pressable
                android_ripple={{ color: theme?.text }}
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: theme?.text,
                  borderRadius: 10,
                  backgroundColor: content.sum === 1 ? "#8a1919" : theme?.gray,
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
                    fontSize: 22,
                    textAlign: "center",
                  }}
                >
                  {content.sum === 1 ? "Remove" : "-1"}
                </Text>
              </Pressable>
              <Pressable
                android_ripple={{ color: theme?.text }}
                style={{
                  padding: 12,
                  borderWidth: 1,
                  borderColor: theme?.text,
                  borderRadius: 10,
                  backgroundColor: theme?.gray,
                  minWidth: 120,
                  marginRight: 50,
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
                    fontSize: 22,
                    textAlign: "center",
                  }}
                >
                  +1
                </Text>
              </Pressable>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginHorizontal: "auto",
                  gap: 15,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: theme?.text,
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  {content.sum}
                </Text>
                <Text
                  style={{
                    color: theme?.text,
                    fontSize: 22,
                  }}
                >
                  x
                </Text>
                <Text
                  style={{
                    color: theme?.text,
                    fontSize: 26,
                    fontStyle: "italic",
                  }}
                >
                  (N.{content.data.identifierNumber})
                </Text>
                <Text style={{ color: theme?.text, fontSize: 26 }}>
                  {content.data.title[selectedLanguage?.id ?? "es"]}
                </Text>
              </View>
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
