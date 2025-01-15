import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native";

interface GenericPressableButtonProps {
  text: string;
  onPress: () => void;
  containerExtraStyles?: StyleProp<ViewStyle>;
  textExtraStyles?: StyleProp<TextStyle>;
}

const GenericPressableButtton = ({
  text,
  onPress,
  containerExtraStyles,
  textExtraStyles,
}: GenericPressableButtonProps) => {
  const { theme, colorScheme } = useTheme();
  const styles = createStyles(theme, colorScheme);

  return (
    <Pressable
      android_ripple={{ color: theme?.background }}
      style={[styles.orderButton, containerExtraStyles]}
      onPress={onPress}
    >
      <Text style={[styles.text, textExtraStyles]}>{text}</Text>
    </Pressable>
  );
};

export default GenericPressableButtton;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    orderButton: {
      minWidth: 100,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 50,
      padding: 20,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.text,
      marginHorizontal: "auto",
    },
    text: { color: theme?.text, fontSize: 20 },
  });
