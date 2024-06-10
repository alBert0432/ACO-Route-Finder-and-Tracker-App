import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
import LoginScreen from './App/Screen/LoginScreen/LoginScreen';
import Colors from './App/Utils/Colors';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import HomeScreen from './App/Screen/HomeScreen/HomeScreen';
import Constants from "expo-constants";


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'ReadexPro': require('./assets/fonts/ReadexPro-Regular.ttf'),
    'ReadexPro-medium': require('./assets/fonts/ReadexPro-SemiBold.ttf'),
    'ReadexPro-bold': require('./assets/fonts/ReadexPro-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={'pk_test_YWRhcHRpbmctZG9nLTE1LmNsZXJrLmFjY291bnRzLmRldiQ'}>
    <View style={styles.container} onLayout={onLayoutRootView}>
        <SignedIn>
          <HomeScreen/>
        </SignedIn>
        <SignedOut>
        <LoginScreen/>
        </SignedOut>
     
      <StatusBar style="auto" />
    </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:Colors.PRIMARY,
    paddingTop:60
  },
});
