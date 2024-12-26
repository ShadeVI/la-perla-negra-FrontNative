import { Colors } from "@/constants/Colors";
import { Language, useLanguage } from "@/context/Language";
import { ColorScheme, useTheme } from "@/context/Theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

// TODO: resolve extraStyle typescript to defined like StyleSheet create
// Used at row 54 and 76
interface ExtraStyles {
  color?: string;
  background?: string;
}

interface ButtonProp {
  item: Language;
  extraStyles?: ExtraStyles;
}

const Button = ({ item, extraStyles }: ButtonProp) => {
  const { theme, colorScheme } = useTheme();
  const { setSelectedLanguage, selectedLanguage } = useLanguage();
  const styles = createStyles(theme, colorScheme, extraStyles);

  return (
    <View key={item.id} style={styles.buttonContainer}>
      <Pressable
        style={[
          styles.button,
          selectedLanguage?.id === item.id && {
            backgroundColor: colorScheme === "dark" ? theme?.tint : theme?.text,
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
