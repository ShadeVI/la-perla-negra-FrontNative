import { createContext, useContext, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Appearance } from "react-native";

type ColorScheme = "dark" | "light" | undefined | null;

export const ThemeContext = createContext({});

export const ThemeProvider = ({
  children,
  initialColorScheme = "dark",
}: {
  children: React.ReactNode;
  initialColorScheme: ColorScheme;
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
  colorScheme?: ColorScheme;
  setColorScheme?: React.Dispatch<React.SetStateAction<ColorScheme>>;
} => useContext(ThemeContext);
