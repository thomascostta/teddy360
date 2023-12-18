import { useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { ThemeProvider } from "styled-components";

import { AppProvider } from "./src/hook";

import { defaultTheme } from "./src/theme/default";

import { fonts } from "./src/assets/fonts";

import { Routes } from "./src/routes";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [hasLoadedFonts] = useFonts(fonts);

  const hideSplashScreen = useCallback(async () => {
    if (hasLoadedFonts) {
      await SplashScreen.hideAsync();
    }
  }, [hasLoadedFonts]);

  useEffect(() => {
    hideSplashScreen();
  }, [hideSplashScreen]);

  if (!hasLoadedFonts) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <StatusBar style="light" backgroundColor="transparent" translucent />
        <AppProvider>
          <Routes />
        </AppProvider>
      </ThemeProvider>
    </>
  );
}
