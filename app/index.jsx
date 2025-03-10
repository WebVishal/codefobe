import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import 'react-native-reanimated';
import { SafeAreaView, StatusBar,Text } from "react-native";
import { Colors } from "../constants/Colors"
import { Redirect } from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Page = () => {

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const isLogin = true

    if (isLogin) {
     return   <Redirect href="/(root)/Profile"/>
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                showHideTransition="slide"
                backgroundColor={Colors.dark.background}
            />
        </SafeAreaView>
    );
};

export default Page;
