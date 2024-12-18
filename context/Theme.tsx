import { createContext, useContext, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Appearance } from "react-native";

export const ThemeContext = createContext({});

export const ThemeProvider = ({
  children,
  initialColorScheme = "dark",
}: {
  children: React.ReactNode;
  initialColorScheme: "dark" | "light" | undefined | null;
}) => {
  const [colorScheme, setColorScheme] = useState(initialColorScheme);
  const theme = colorScheme ? Colors[colorScheme] : Colors.light;

  Appearance.addChangeListener(({ colorScheme }) =>
    setColorScheme(colorScheme ?? null)
  );

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): {
  theme?: typeof Colors.light;
  colorScheme?: "dark" | "light" | undefined | null;
  setColorScheme?: React.Dispatch<
    React.SetStateAction<"dark" | "light" | null>
  >;
} => useContext(ThemeContext);
