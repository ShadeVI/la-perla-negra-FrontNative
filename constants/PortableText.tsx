import { lineHeight } from "@/utils/utils";
import { PortableTextReactComponents } from "@portabletext/react-native";
import { Text, View } from "react-native";
import { ColorScheme, Theme } from "@/context/Theme";
import { Link } from "expo-router";

interface PortableTextConfigProps {
  theme?: Theme;
  colorScheme: ColorScheme;
}

export const createPortableTextConfig = ({
  theme,
  colorScheme,
}: PortableTextConfigProps): Partial<PortableTextReactComponents> => ({
  block: {
    h1: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 34,
            lineHeight: lineHeight(26),
            paddingVertical: 5,
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
    h2: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 30,

            lineHeight: lineHeight(26),
            paddingVertical: 5,
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
    h3: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 28,
            lineHeight: lineHeight(22),
            paddingVertical: 5,
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
    h4: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 26,
            lineHeight: lineHeight(22),
            paddingVertical: 5,
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
    h5: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 23,
            lineHeight: lineHeight(20),
            paddingVertical: 5,
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
    h6: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 20,
            lineHeight: lineHeight(19),
            paddingVertical: 5,
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
    normal: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 18,
            lineHeight: lineHeight(16),
            paddingVertical: 5,
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
  },
  marks: {
    code: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 18,
            lineHeight: lineHeight(16),
            paddingVertical: 5,
            paddingHorizontal: 3,
            color: theme?.text,
            backgroundColor: colorScheme === "dark" ? "#666666" : "#d3d3d3",
          }}
        >
          {children}
        </Text>
      );
    },
    strong: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 18,
            lineHeight: lineHeight(16),
            paddingVertical: 5,
            fontWeight: "bold",
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
    em: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 18,
            lineHeight: lineHeight(16),
            paddingVertical: 5,
            fontStyle: "italic",
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
    underline: ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 18,
            paddingVertical: 5,
            lineHeight: lineHeight(16),
            textDecorationLine: "underline",
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
    link: ({ children, value }) => {
      return (
        <Link
          href={value.href}
          style={{
            fontSize: 18,
            paddingVertical: 5,
            lineHeight: lineHeight(16),
            color: theme?.text,
          }}
        >
          {children}
        </Link>
      );
    },
    "strike-through": ({ children }) => {
      return (
        <Text
          style={{
            fontSize: 18,
            paddingVertical: 5,
            lineHeight: lineHeight(16),
            textDecorationLine: "line-through",
            color: theme?.text,
          }}
        >
          {children}
        </Text>
      );
    },
  },
  list: {
    bullet: ({ children }) => {
      return (
        <View
          style={{
            paddingVertical: 5,
          }}
        >
          {children}
        </View>
      );
    },
    number: ({ children }) => {
      return (
        <View
          style={{
            paddingVertical: 5,
          }}
        >
          {children}
        </View>
      );
    },
  },
  listItem: {
    bullet: ({ children, value }) => {
      return (
        <Text
          style={{
            fontSize: 18,
            paddingVertical: 5,
            lineHeight: lineHeight(16),
            color: theme?.text,
            marginLeft: value.level ? value.level * 10 : 0,
          }}
        >
          {value.level === 1 ? "•" : value.level === 2 ? "◦" : "▪"} {children}
        </Text>
      );
    },
    number: ({ children, index }) => {
      return (
        <Text
          style={{
            fontSize: 18,
            paddingVertical: 5,
            lineHeight: lineHeight(16),
            color: theme?.text,
          }}
        >
          {index + 1}. {children}
        </Text>
      );
    },
  },
});
