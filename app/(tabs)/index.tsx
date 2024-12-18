import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/Theme";
import { StyleSheet, Text, View } from "react-native";
import ButtonContainer from "@/components/ButtonContainer";

//REMPLAZAR ESTE ARRAY CON UNA LLAMADA A LA API
const supportedLanguagesFromAPI = [
  { id: "es", name: "Español" },
  { id: "en", name: "English" },
  { id: "de", name: "Deutsche" },
];

export default function HomeScreen() {
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>La Perla Negra</Text>
      <ButtonContainer data={supportedLanguagesFromAPI}/>
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
    
    
  });
