import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
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
    <View style={[styles.orderButton, containerExtraStyles]}>
      <Pressable
        android_ripple={{ color: theme?.text }}
        style={[{ padding: 20 }]}
        onPress={onPress}
      >
        <Text style={[styles.text, textExtraStyles]}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default GenericPressableButtton;

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) =>
  StyleSheet.create({
    orderButton: {
      minWidth: 100,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.text,
      overflow: "hidden",
    },
    text: { color: theme?.text, fontSize: 20 },
  });
