import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useThemeStyles} from "../components/Styles";
import {useLoginContext} from "../components/LoginContext";

const LoginScreen = () => {
    const navigation = useNavigation();
    const styles = useThemeStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {setLoggedIn} = useLoginContext();

    // Attempt to log in with the provided email and password
    const handleLogin = async () => {
        // Prevent login attempt if email or password is empty
        if (!email || !password) {
            Alert.alert('Error', 'Please enter email and password');
            return;
        }

        setLoading(true); // User can't press the Login button again while loading

        // Send a POST request to the login endpoint
        try {
            const response = await fetch('https://cs420.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/text',
                },
                body: JSON.stringify({userName: email, password}),
            });

            if (response.status === 200) {
                const token = await response.text(); // Get the session token
                await AsyncStorage.setItem('sessionToken', token); // Store the token in AsyncStorage
                setLoggedIn(true);
                Alert.alert('Success', 'Login successful!');
                navigation.navigate('Home');
            } else {
                Alert.alert('Error', 'Invalid credentials');
            }
        } catch (error) {
            console.error('Login Error:', error);
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, {justifyContent: 'center', alignItems: 'stretch'}]}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.textInput}
                placeholderTextColor={styles.placeholder.color}
                height={50}
                keyboardType="email-address"
            />
            <View style={[styles.textInput, {flexDirection: 'row', alignItems: 'center', height: 50}]}>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    style={{flex: 1, color: styles.textInput.color}}
                    placeholderTextColor={styles.placeholder.color}
                    height={50}
                />
                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                    {isPasswordVisible ?
                        <MaterialCommunityIcons name='eye-outline' size={20} color={styles.placeholder.color}/> :
                        <MaterialCommunityIcons name='eye-off-outline' size={20} color={styles.placeholder.color}/>}
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
                disabled={loading}
            >
                <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginScreen;
