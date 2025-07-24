import {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Platform} from 'react-native';
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from 'expo-notifications';
import {useThemeStyles} from '../components/Styles';
import {useLoginContext} from '../components/LoginContext';

/**
 * Sends a push notification to a given Expo push token.
 * @param {string} pushToken - The Expo push token of the recipient
 * @param {string} username - The username of the sender (to include in data)
 */
export const sendPushNotification = async (pushToken, username) => {
    await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: pushToken,
            sound: 'default',
            title: 'STEDI Data Shared',
            body: `${username} has shared their STEDI data with you!`,
            data: { username },
        }),
    });
};

/** Retrieves the push token for a given user from the API
 * @param {string} username - The username of the target user to get the push token for
 * @param {string} sessionToken - The session token of the current user, used for authentication
 * @returns {Promise<string|null>} - The push token for the target user, or null if it does not exist
 */
export const getPushToken = async (username, sessionToken) => {
    const response = await fetch(`https://dev.stedi.me/pushtokentestonly/${username}`, {
        method: 'GET',
        headers: {
            'suresteps.session.token': sessionToken,
        },
    });
    const data = await response.json();
    console.log('getPushToken response data:', data);
    if (typeof data === 'string') return data;
    return data.token || data.expoPushToken || undefined;
};

/** Saves the push token to the API for a given user.
 * @param userName - The username of the user to save the push token for
 * @param sessionToken - The session token of the current user, used for authentication
 * @param pushToken - The user's current push token
 */
export const savePushTokenToAPI = async (userName, sessionToken, pushToken) => {
    const oldToken = await getPushToken(userName, sessionToken);
    if (oldToken !== pushToken) {
        await fetch(`https://dev.stedi.me/pushtokentestonly/${userName}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'suresteps.session.token': sessionToken,
            },
            body: JSON.stringify({ expoPushToken: pushToken }),
        });
    }
};

function handleRegistrationError(error) {
    alert('Failed to register for push notifications: ' + error.message);
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            throw new Error('Permission not granted for push notifications!');
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
        throw new Error('Must use physical device for Push Notifications');
    }
    return token;
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function NotificationScreen() {
    const [notification, setNotification] = useState(null);
    const [sending, setSending] = useState(false);
    const styles = useThemeStyles();
    const {userName, sessionToken} = useLoginContext();

    useEffect(() => {
        (async () => {
            try {
                const token = await registerForPushNotificationsAsync();
                await savePushTokenToAPI(userName, sessionToken, token);
            } catch (e) {
                handleRegistrationError(e);
            }
        })();
    }, []);

    /** Sends a push notification to the physician with the user's name. */
    const sendDataToPhysician = async () => {
        setSending(true);
        try {
            // Replace 'physician' with the actual physician's username if needed
            const physicianUserName = 'physician';
            const physicianPushToken = await getPushToken(physicianUserName, sessionToken);
            if (physicianPushToken) {
                await sendPushNotification(physicianPushToken, userName);
            } else {
                console.warn('Physician push token not found.');
            }
        } finally {
            setSending(false);
        }
    };

    return (
        <View style={[styles.container, {justifyContent: 'space-between'}]}>
            <View>
                <Text style={styles.title}>Share Your Data with a Physician</Text>
                <Text style={styles.text}>
                    Before you can receive a personalized health assessment, please share your STEDI data with your
                    physician. This allows them to review your results, monitor key health indicators, and provide
                    expert recommendations tailored to your needs.
                </Text>
                {notification !== null &&
                    <View style={[styles.textInput, {marginTop: 30, padding: 20}]}>
                        <Text style={[styles.largeText, {marginBottom: 10}]}>{notification.request.content.title}</Text>
                        <Text style={styles.text}>{notification.request.content.body}</Text>
                        <Text style={styles.text}>Last updated at: {new Date(notification.date).toLocaleString()}</Text>
                    </View>
                }
            </View>
            <TouchableOpacity onPress={sendDataToPhysician} style={styles.button} disabled={sending}>
                <Text style={styles.buttonText}>{sending ? 'Sending...' : 'Send Data to a Physician'}</Text>
            </TouchableOpacity>
        </View>
    );
}
