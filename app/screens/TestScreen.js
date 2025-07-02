import React from 'react';
import {Text, View} from 'react-native';
import {useThemeStyles} from "../components/Styles";

const TestScreen = () => {
    const styles = useThemeStyles();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is the testing screen</Text>
            <Text style={styles.text}>You can use this page for testing purposes if you want. Open
                app/screens/TestScreen.js to modify this page</Text>
        </View>
    )
}

export default TestScreen;