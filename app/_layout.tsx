import { DataProvider } from "@/context/Data";
import { LanguageProvider } from "@/context/Language";
import { OrderProvider } from "@/context/Order";
import { ThemeProvider } from "@/context/Theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
// import { useEffect } from "react";
import { Appearance } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  /* const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  } */

  return (
    <ThemeProvider initialColorScheme={Appearance.getColorScheme()}>
      <LanguageProvider>
        <DataProvider>
          <StatusBar style="auto" />
          <SafeAreaProvider>
            <OrderProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </OrderProvider>
          </SafeAreaProvider>
        </DataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
