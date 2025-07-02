import { StyleSheet, useColorScheme } from 'react-native';

export const useThemeStyles = () => {
    const colorScheme = useColorScheme();

    // Define colors for light and dark mode
    const darkBlue = '#2141b1';
    const lightBlue = '#2e59e3';
    const lightBlueText = '#7799ff';
    const darkRed = '#e13e3e';
    const lightRed = '#da5c5c';
    const darkText = '#000';
    const lightText = '#ccc';
    const darkBackground = '#202020';
    const lightBackground = '#f0f0f0';

    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: colorScheme === 'dark' ? darkBackground : lightBackground,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 20,
            color: colorScheme === 'dark' ? '#fff' : '#000',
        },
        largeText: {
            fontSize: 18,
            marginBottom: 20,
            color: colorScheme === 'dark' ? lightText : darkText,
        },
        text: {
            color: colorScheme === 'dark' ? lightText : darkText,
            textAlign: 'justify',
        },
        blueLink: {
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            color: colorScheme === 'dark' ? lightBlueText : darkBlue,
        },
        redLink: {
            fontWeight: 'bold',
            textDecorationLine: 'underline',
            color: colorScheme === 'dark' ? lightRed : darkRed,
        },
        button: {
            backgroundColor: colorScheme === 'dark' ? lightBlue : darkBlue,
            padding: 15,
            borderRadius: 5,
            alignItems: 'center',
            marginBottom: 20,
        },
        buttonText: {
            color: 'white',
            fontSize: 18,
        },
        textInput: {
            padding: 10,
            marginBottom: 20,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: colorScheme === 'dark' ? '#555' : '#ccc',
            color: colorScheme === 'dark' ? '#fff' : '#000',
        },
        placeholder: {
            color: colorScheme === 'dark' ? '#aaa' : '#666',
        },
    });
};