import { Colors } from "@/constants/Colors";
import { Language, useLanguage } from "@/context/Language";
import { ColorScheme, useTheme } from "@/context/Theme";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useRouter } from "expo-router";
import { PressableProps } from "react-native-gesture-handler";


// viewContainer, pressableContainer e text, possono avere proprietà diverse, quindi si usa l'interfaccia StyleProp per avere l'autocompletato delle props che aiuta quando si passa da un componente all'altro e sapere già cosa sono quelle cose.
// ViewStyle, PressableProps e TextStyle sono interfacce che vengono da react-native, rispettivamente specifici per i componenti View, Pressable e Text.
interface ExtraStyles {
  viewContainer?: StyleProp<ViewStyle>;
  pressableContainer?: StyleProp<PressableProps>;
  text?: StyleProp<TextStyle>;
}
// StyleProp è una interfacce che viene da react-native, che permette di definire un tipo di stile per un componente.abs
// è un tipo generico che può essere di qualsiasi tipo, in questo caso di ViewStyle o TextStyle.
// Ogni componente ha un tipo di stile diverso, quindi bisogna specificare il tipo di stile che si vuole utilizzare.
// StyleProp<ViewStyle> è un tipo di stile per un componente View, mentre StyleProp<TextStyle> è un tipo di stile per un componente Text.


interface ButtonProps {
  item: Language;
  extraStyles?: ExtraStyles;
  handleOnPress: () => void;
}

const Button = ({ item, extraStyles, handleOnPress }: ButtonProps) => {
  const { theme, colorScheme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const styles = createStyles(theme, colorScheme);

  return (
    <View
      key={item.id}
      style={[styles.buttonContainer, extraStyles?.viewContainer]}
    >
      <Pressable
        style={[
          styles.button, extraStyles?.pressableContainer, 
          selectedLanguage?.id === item.id && {
            backgroundColor: theme?.tint,
          },
        ]}
        onPress={handleOnPress}
      >
        <Text
          style={[
            styles.buttonText, extraStyles?.text,
            selectedLanguage?.id === item.id && {
              color: colorScheme === "dark" ? theme?.text : theme?.background,
            },
          ]}
        >
          {item.title}
        </Text>
      </Pressable>
    </View>
  );
};
export default Button;

const createStyles = (
  theme: typeof Colors.light | undefined = Colors.light,
  colorScheme: ColorScheme,
  extraStyles?: ExtraStyles
) =>
  StyleSheet.create({
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
      backgroundColor:
        colorScheme === "dark" ? theme.text : theme.tabIconDefault,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      fontSize: 20,
      textAlign: "center",
      color: colorScheme === "dark" ? theme?.background : theme?.text,
    },
  });
