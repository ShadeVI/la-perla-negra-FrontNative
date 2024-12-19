import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

//REMPLAZAR ESTE ARRAY CON UNA LLAMADA A LA API
/* const supportedLanguagesFromAPI = [
  { id: "es", name: "Español" },
  { id: "en", name: "English" },
  { id: "de", name: "Deutsche" },
]; */

export default function HomeScreen() {
  const { theme } = useTheme();
  const { allSupportedLanguages, setSelectedLanguage, selectedLanguage } =
    useLanguage();

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>La Perla Negra</Text>
      <FlatList
        data={allSupportedLanguages}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.buttonContainer}>
            <Pressable
              style={[
                styles.button,
                selectedLanguage?.id === item.id && {
                  backgroundColor: theme?.tint,
                },
              ]}
              onPress={() => {
                setSelectedLanguage(item);
              }}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedLanguage?.id === item.id && {
                    color: theme?.background,
                  },
                ]}
              >
                {item.title}
              </Text>
            </Pressable>
          </View>
        )}
        contentContainerStyle={{
          flexDirection: "row",
          gap: 50,
        }}
        style={styles.list}
      />
    </View>
  );
}

const createStyles = (theme: typeof Colors.light | undefined = Colors.light) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
      gap: 100,
    },
    heading: {
      fontSize: 50,
      textAlign: "center",
      color: theme.text,
    },
    list: {
      flexGrow: 0,
    },
    buttonContainer: {
      width: 120,
      height: 80,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: "100%",
      height: "100%",
      padding: 15,
      backgroundColor: "rgb(202,202,202)",
      color: "white",
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontSize: 20,
      textAlign: "center",
    },
  });
