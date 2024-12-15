import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColor";
import { lineHeight } from "@/utils/utils";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

//REMPLAZAR ESTE ARRAY CON UNA LLAMADA A LA API
const supportedLanguagesFromAPI = [
  { id: "es", name: "Español" },
  { id: "en", name: "English" },
  { id: "de", name: "Deutsche" },
];

export default function HomeScreen() {
  // Testeando el useThemeColor Hook
  const color = useThemeColor(
    { light: Colors["light"].text, dark: Colors["dark"].background },
    "text"
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.heading} type="title">
          La Perla Negra
        </ThemedText>
        <ThemedView style={styles.listContainer}>
          {supportedLanguagesFromAPI.map((item) => (
            <ThemedView style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={() => {
                  console.log("hello");
                }}
              >
                <ThemedText
                  type="defaultSemiBold"
                  style={{ color: color, ...styles.buttonText }}
                >
                  {item.name}
                </ThemedText>
              </Pressable>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 100,
  },
  heading: {
    fontSize: 50,
    lineHeight: lineHeight(50),
    textAlign: "center",
  },
  listContainer: {
    flexDirection: "row",
    flexGrow: 0,
  },
  buttonContainer: {
    width: 180,
    height: 100,
    marginHorizontal: 20,
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
    fontSize: 25,
    lineHeight: lineHeight(25),
    textAlign: "center",
  },
});
