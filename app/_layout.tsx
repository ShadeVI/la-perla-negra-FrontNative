import { DataProvider } from "@/context/Data";
import { LanguageProvider } from "@/context/Language";
import { OrderProvider } from "@/context/Order";
import { ThemeProvider } from "@/context/Theme";
import { Stack } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme, View, Text } from "react-native";
import "react-native-reanimated";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  console.log("RENDERING: ROOTLAYOUT");

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      console.log("CALLING: hideAsync");
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    console.log("RETURNING: null");
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  console.log("RENDERING: RootLayoutNav");
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider initialColorScheme={colorScheme}>
      <LanguageProvider>
        <DataProvider>
          <OrderProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </OrderProvider>
        </DataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
