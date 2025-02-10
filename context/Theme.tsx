import { createContext, useContext, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Appearance } from "react-native";

export type ColorScheme = "dark" | "light" | undefined | null;

export type Theme = {
  text: string;
  background: string;
  gray: string;
  tint: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
};

export const ThemeContext = createContext({});

export const ThemeProvider = ({
  children,
  initialColorScheme = "dark",
}: {
  children: React.ReactNode;
  initialColorScheme?: ColorScheme;
}) => {
  const [colorScheme, setColorScheme] = useState(initialColorScheme);
  const theme: Theme = colorScheme ? Colors[colorScheme] : Colors.light;

  Appearance.addChangeListener(({ colorScheme }) =>
    setColorScheme(colorScheme ?? null)
  );

  console.log("RENDERING: THEME");

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): {
  theme?: Theme;
  colorScheme?: ColorScheme;
  setColorScheme?: React.Dispatch<React.SetStateAction<ColorScheme>>;
} => useContext(ThemeContext);
