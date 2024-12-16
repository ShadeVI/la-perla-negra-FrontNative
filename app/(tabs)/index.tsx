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
            <ThemedView key={item.id} style={styles.buttonContainer}>
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
    fontSize: 40,
    lineHeight: lineHeight(20),
    textAlign: "center",
  },
  listContainer: {
    flexDirection: "row",
    flexGrow: 0,
  },
  buttonContainer: {
    width: 120,
    height: 80,
    marginHorizontal: 15,
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
    lineHeight: lineHeight(15),
    textAlign: "center",
  },
});
