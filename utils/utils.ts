import { Dimensions, Image, StyleProp, StyleSheet, Text, View, } from "react-native";


export function lineHeight(fontSize: number) {
  const multiplier = fontSize > 20 ? 1.5 : 1;
  return fontSize + fontSize * multiplier;
}

export const isMobile = Dimensions.get("screen").width < 1000;
