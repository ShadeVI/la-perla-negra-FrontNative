import { useTheme } from "@/context/Theme";
import { useTextTranslation } from "@/hooks/useTranslation";
import { WineType } from "@/lib/sanity/httpSanity";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight, FadeOutRight } from "react-native-reanimated";

interface FilterWinesProps {
  filters: WineType[];
  onPress: (filter: WineType | null) => void;
  activeWineFilters: WineType[];
}

const FilterWines = ({
  filters,
  onPress,
  activeWineFilters,
}: FilterWinesProps) => {
  const { translateInAppText } = useTextTranslation();
  const { theme } = useTheme();

  return (
    <Animated.View
      entering={FadeInRight.duration(300)}
      exiting={FadeOutRight.duration(300)}
      style={{
        flexDirection: "row",
        height: "100%",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 30,
      }}
    >
      {filters.map((filter) => (
        <Pressable onPress={() => onPress(filter)} key={filter}>
          <View
            style={{
              borderWidth: 1,
              borderColor: theme?.text,
              paddingVertical: 6,
              paddingHorizontal: 12,
              borderRadius: 6,
              backgroundColor: activeWineFilters.includes(filter)
                ? "rgba(77, 234, 89, 0.2)"
                : "transparent",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: theme?.text,
              }}
            >
              {translateInAppText(filter)}
            </Text>
          </View>
        </Pressable>
      ))}
      <Pressable onPress={() => onPress(null)}>
        <View
          style={{
            borderWidth: 1,
            borderColor: theme?.text,
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 6,
            backgroundColor: "rgba(228, 61, 61, 0.5)",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: theme?.text,
            }}
          >
            {translateInAppText("btn-remove-filters")}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default FilterWines;
