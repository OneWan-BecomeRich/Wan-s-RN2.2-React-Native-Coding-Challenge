import React from "react";
import {StatusBar, useColorScheme} from "react-native";
import {DarkTheme, DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import NotificationScreen from "./screens/NotificationScreen";
import TestScreen from "./screens/TestScreen";
import {LoginProvider} from "./components/LoginContext";

const Stack = createNativeStackNavigator();

export default function App() {
    const colorScheme = useColorScheme();

    return (
        <LoginProvider>
            {/*Controls the color of the top bar of the app*/}
            <StatusBar
                barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colorScheme === 'dark' ? '#111' : '#fff'}
            />
            {/*Lays out the navigation structure of the app*/}
            <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack.Navigator initialRouteName='Home' id='root'>
                    <Stack.Screen name='Home' component={HomeScreen}/>
                    <Stack.Screen name='Login' component={LoginScreen}/>
                    <Stack.Screen name='Sign Up' component={SignUpScreen}/>
                    <Stack.Screen name='Health Assessment' component={NotificationScreen}/>
                    <Stack.Screen name='Test' component={TestScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </LoginProvider>
    );
}