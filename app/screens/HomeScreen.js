import React from 'react';
import {View, Text, TouchableOpacity, Image, Alert, useColorScheme} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {useThemeStyles} from "../components/Styles";
import {getSessionToken, handleDeleteUser, handleLogout} from "../components/LoginTools";
import {useLoginContext} from "../components/LoginContext";

const HomeScreen = () => {
    const navigation = useNavigation();
    const styles = useThemeStyles();
    const colorScheme = useColorScheme(); // Detect light/dark mode
    const {loggedIn, userName} = useLoginContext();
    getSessionToken();

    // Show a confirmation dialog before deleting the user's account
    const showDeletionConfirmation = () => {
        Alert.alert(
            "Confirm Account Deletion",
            "Are you sure you want to delete your account?",
            [
                {text: "No", style: "cancel", onPress: () => console.log("User deletion canceled")},
                {text: "Yes", onPress: () => handleDeleteUser()}
            ]
        );
    }

    return (
        <View style={[styles.container, {alignItems: 'center'}]}>
            <Image
                source={colorScheme === 'dark' ? require('../../assets/images/STEDI-Logo-Dark.png') : require('../../assets/images/STEDI-Logo-Light.png')}
                style={{width: 300, height: 300}}
            />
            <Text style={styles.title}>Welcome to STEDI</Text>

            {loggedIn ? (
                // If logged in, display a welcome message
                <Text style={styles.largeText}>Hello, {userName}</Text>
            ) : (
                // If not logged in, display a message prompting the user to log in
                <Text style={styles.largeText}>Please log in to continue.</Text>
            )}

            {loggedIn ? (
                // If logged in, display a Notifications button, a Log-Out button, and Delete Account link
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Health Assessment')} style={styles.button}>
                        <Text style={styles.buttonText}>Health Assessment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleLogout()} style={styles.button}>
                        <Text style={styles.buttonText}>Log Out</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}> Not interested in our services anymore? {' '}
                        <Text style={styles.redLink} onPress={() => showDeletionConfirmation()}>
                            Delete Account
                        </Text>
                    </Text>
                </View>
            ) : (
                // If not logged in, display a Log-In button and Sign-Up link
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <Text style={styles.text}> Don't have an account? {' '}
                        <Text style={styles.blueLink} onPress={() => navigation.navigate('Sign Up')}>
                            Sign Up
                        </Text>
                    </Text>
                </View>
            )}
            <Text style={[styles.text, { position: 'absolute', bottom: 0, paddingBottom: 20 }]}>
                Are you a developer? You can use our {' '}
                <Text style={styles.blueLink} onPress={() => navigation.navigate('Test')}>
                    test page
                </Text>
                {' '} for testing purposes!
            </Text>
        </View>
    );
}

export default HomeScreen;
