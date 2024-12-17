import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/Theme";
import { StyleProp, StyleSheet, StyleSheetProperties } from "react-native";


export function lineHeight(fontSize: number) {
  const multiplier = fontSize > 20 ? 1.5 : 1;
  return fontSize + fontSize * multiplier;
}


export function createStyles(callback: (theme?:
  typeof Colors.light
) => StyleProp<any>) {
  const { theme } = useTheme()
  return StyleSheet.create(callback(theme))
}