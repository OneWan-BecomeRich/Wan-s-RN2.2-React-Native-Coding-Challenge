import React from 'react';
import {Text, View} from 'react-native';
import {useThemeStyles} from "../components/Styles";

const SignUpScreen = () => {
    const styles = useThemeStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is the Sign Up screen</Text>
            <Text style={styles.text}>Open app/screens/SignUpScreen.js to modify this page</Text>
        </View>
    )
}

export default SignUpScreen;