import GenericPressableButtton from "@/components/GenericPressableButtton";
import { Colors } from "@/constants/Colors";
import { ORDER_REDUCER_TYPES, useOrder } from "@/context/Order";
import { ColorScheme, useTheme } from "@/context/Theme";
import { useTextTranslation } from "@/hooks/useTranslation";
import { SanityDocumentTypes } from "@/lib/sanity/httpSanity";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const OrderPage = () => {
  const { order, dispatch } = useOrder();
  const { theme, colorScheme } = useTheme();
  const { translateInAppText, translateCMSText } = useTextTranslation();

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
          {translateInAppText("memo-title")}:
        </Text>
        <GenericPressableButtton
          text={translateInAppText("btn-memo-reset-text").toUpperCase()}
          onPress={() =>
            dispatch({ payload: null, type: ORDER_REDUCER_TYPES.RESET })
          }
          containerExtraStyles={{ marginBottom: 0 }}
        />
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
        {Object.entries(order)
          .sort((a, b) => a[1].data.categoryNumber - b[1].data.categoryNumber)
          .map((elem) => {
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

                    backgroundColor:
                      content.sum === 1 ? "#8a1919" : theme?.gray,
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
                      color:
                        content.sum === 1 && colorScheme === "dark"
                          ? theme?.text
                          : content.sum === 1
                          ? theme?.background
                          : theme?.text,
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
                    {content.sum.toString().padEnd(3)}
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
                    {content.data._type === SanityDocumentTypes.DISH &&
                      `(N.${content.data.identifierNumber})`
                        .padStart(8)
                        .padEnd(10)}
                  </Text>
                  <Text style={{ color: theme?.text, fontSize: 26 }}>
                    {translateCMSText(content.data.title)}
                  </Text>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default OrderPage;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme?.background,
    },
  });
