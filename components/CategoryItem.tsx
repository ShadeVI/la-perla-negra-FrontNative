import { Colors } from "@/constants/Colors";
import { useLanguage } from "@/context/Language";
import { useTheme } from "@/context/Theme";
import { Category } from "@/lib/sanity/httpSanity";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import * as Device from "expo-device";
import { useEffect, useState } from "react";

interface CategoryItemProps {
  item: Category;
  isSelected: boolean;
  onPress: () => void;
  languageId: string | undefined;
}

export const CategoryItem = ({
  item,
  isSelected,
  onPress,
}: CategoryItemProps) => {
  const { theme } = useTheme();
  const { selectedLanguage } = useLanguage();
  const [isTablet, setIsTablet] = useState(false);

  const underlineStyle = useAnimatedStyle(
    () => ({
      left: withTiming(isSelected ? "50%" : "0%", { duration: 300 }),
      transform: [{ translateX: "-50%" }],
      opacity: withTiming(isSelected ? 1 : 0, { duration: 300 }),
    }),
    [isSelected]
  );

  const styles = createStyles(theme, isTablet);

  useEffect(() => {
    async function isTablet() {
      const res =
        (await Device.getDeviceTypeAsync()) === Device.DeviceType.TABLET;
      setIsTablet(res);
    }
    isTablet();
  }, []);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1, padding: 20 }]}
    >
      <View style={styles.categoryButton}>
        <Text
          style={[styles.categoryText, isSelected && { fontWeight: "bold" }]}
        >
          {item.title[selectedLanguage?.id as string] ?? item.title.es}
        </Text>
        <Animated.View style={[styles.underline, underlineStyle]} />
      </View>
    </Pressable>
  );
};

const createStyles = (
  theme: typeof Colors.light | undefined = Colors.light,
  isTablet: boolean
) =>
  StyleSheet.create({
    categoryButton: {
      position: "relative",
      paddingVertical: 5,
      minWidth: 100,
      alignItems: "center",
      justifyContent: "center",
      borderBottomWidth: 0,
      borderBottomColor: theme?.text,
    },
    categoryText: {
      color: theme?.text,
      textAlign: "center",
      fontSize: isTablet ? 20 : 16,
    },
    underline: {
      position: "absolute",
      borderRadius: 5,
      height: 5,
      bottom: 0,
      width: "30%",
      marginHorizontal: "auto",
      backgroundColor: theme?.text,
    },
  });
