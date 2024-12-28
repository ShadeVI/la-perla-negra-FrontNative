import {
  StyleSheet,
  View,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  ActivityIndicatorProps,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";

interface ExtraStyles {
  indicatorContainer?: StyleProp<ViewStyle>;
  activityIndicator?: StyleProp<ViewStyle>;
}
interface LoadingIndicatorProps extends ActivityIndicatorProps {
  extraStyles?: ExtraStyles;
}

const LoadingIndicator = ({
  size,
  extraStyles,
  color,
}: LoadingIndicatorProps) => {
  const { theme, colorScheme } = useTheme();
  const styles = createStyles(theme, colorScheme);
  return (
    <View style={[styles.loadingContainer, extraStyles?.indicatorContainer]}>
      <ActivityIndicator
        size={size}
        color={color}
        style={[extraStyles?.activityIndicator]}
      />
    </View>
  );
};
export default LoadingIndicator;

const createStyles = (
  theme = Colors.light,
  colorScheme: ColorScheme,
  extraStyles?: ExtraStyles
) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
