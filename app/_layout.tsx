import { DataProvider } from "@/context/Data";
import { LanguageProvider } from "@/context/Language";
import { OrderProvider } from "@/context/Order";
import { ThemeProvider } from "@/context/Theme";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect, useState } from "react";
import { Appearance, View, Text } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return <View style={{ flex: 1, }} onLayout={onLayoutRootView}><Text>layout</Text></View>
  /*
  return (
    <ThemeProvider initialColorScheme={Appearance.getColorScheme()}>
      <LanguageProvider>
        <DataProvider>
          <OrderProvider>
            <StatusBar style="auto" />
            <SafeAreaProvider>
              <View
                style={{
                  flex: 1,
                }}
                onLayout={onLayoutRootView}
              >
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen name="+not-found" />
                </Stack>
              </View>
            </SafeAreaProvider>
          </OrderProvider>
        </DataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );*/
}
