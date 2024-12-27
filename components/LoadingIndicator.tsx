import {
    StyleSheet,
    View,
    ActivityIndicator,
  } from "react-native";
import { Colors } from "@/constants/Colors";
import { ColorScheme, useTheme } from "@/context/Theme";

export default function LoadingIndicator() {

    const { theme, colorScheme } = useTheme();
    const styles = createStyles(theme, colorScheme);

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme?.icon} />
    </View>

};

const createStyles = (theme = Colors.light, colorScheme: ColorScheme) => 
    StyleSheet.create({

    })