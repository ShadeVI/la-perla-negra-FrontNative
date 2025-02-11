import Button from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { Language, useLanguage } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { useRouter } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const { theme } = useTheme();
  const { allSupportedLanguages, setSelectedLanguage } = useLanguage();
  const router = useRouter()
  
  const styles = createStyles(theme);

  function handleOnPress(item: Language) {
    setSelectedLanguage(item);
    router.push("/menu");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>La Perla Negra</Text>
      <FlatList
        data={allSupportedLanguages}
        renderItem={({ item }) => (
        <Button item={item} handleOnPress={() => handleOnPress(item)}/> 
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
