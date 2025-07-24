import {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Platform, Alert, ScrollView} from 'react-native';
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from 'expo-notifications';
import {useThemeStyles} from '../components/Styles';
import {useLoginContext} from '../components/LoginContext';

const API_URL = 'https://cs420.vercel.app';

/**
 * Creates a clinician access request
 * @param {string} clinicianUsername - The username of the clinician
 * @param {string} customerEmail - The email of the customer
 * @param {string} sessionToken - The session token for authentication
 */
export const createClinicianAccessRequest = async (clinicianUsername, customerEmail, sessionToken) => {
    const response = await fetch(`${API_URL}/clinicianAccessRequest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'suresteps.session.token': sessionToken,
        },
        body: JSON.stringify({
            clinicianUsername,
            customerEmail,
        }),
    });
    
    if (!response.ok) {
        throw new Error(`Failed to create access request: ${response.status}`);
    }
    
    return response.text();
};

/**
 * Gets all clinician access requests for a customer
 * @param {string} customerEmail - The email of the customer
 * @param {string} sessionToken - The session token for authentication
 */
export const getClinicianAccessRequests = async (customerEmail, sessionToken) => {
    const response = await fetch(`${API_URL}/clinicianAccessRequests/${encodeURIComponent(customerEmail)}`, {
        method: 'GET',
        headers: {
            'suresteps.session.token': sessionToken,
        },
    });
    
    if (!response.ok) {
        throw new Error(`Failed to get access requests: ${response.status}`);
    }
    
    return response.json();
};

/**
 * Deletes a clinician access request
 * @param {string} clinicianUsername - The username of the clinician
 * @param {string} customerEmail - The email of the customer
 * @param {string} sessionToken - The session token for authentication
 */
export const deleteClinicianAccessRequest = async (clinicianUsername, customerEmail, sessionToken) => {
    const response = await fetch(`${API_URL}/clinicianAccessRequest`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'suresteps.session.token': sessionToken,
        },
        body: JSON.stringify({
            clinicianUsername,
            customerEmail,
        }),
    });
    
    if (!response.ok) {
        throw new Error(`Failed to delete access request: ${response.status}`);
    }
    
    return response.text();
};

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
    const response = await fetch(`${API_URL}/pushtokentestonly/${username}`, {
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
        await fetch(`${API_URL}/pushtokentestonly/${userName}`, {
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
    const [accessRequests, setAccessRequests] = useState([]);
    const [loadingRequests, setLoadingRequests] = useState(false);
    const styles = useThemeStyles();
    const {userName, sessionToken} = useLoginContext();

    useEffect(() => {
        (async () => {
            try {
                const token = await registerForPushNotificationsAsync();
                await savePushTokenToAPI(userName, sessionToken, token);
                // Load access requests
                await loadAccessRequests();
            } catch (e) {
                handleRegistrationError(e);
            }
        })();
    }, []);

    const loadAccessRequests = async () => {
        if (!userName) return;
        
        setLoadingRequests(true);
        try {
            const requests = await getClinicianAccessRequests(userName, sessionToken);
            setAccessRequests(requests);
        } catch (error) {
            console.error('Error loading access requests:', error);
            Alert.alert('Error', 'Failed to load access requests');
        } finally {
            setLoadingRequests(false);
        }
    };

    const handleDeleteRequest = async (clinicianUsername) => {
        try {
            await deleteClinicianAccessRequest(clinicianUsername, userName, sessionToken);
            Alert.alert('Success', 'Access request deleted successfully');
            await loadAccessRequests(); // Reload the list
        } catch (error) {
            console.error('Error deleting access request:', error);
            Alert.alert('Error', 'Failed to delete access request');
        }
    };

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
        <ScrollView style={styles.container}>
            <View style={{justifyContent: 'space-between', paddingBottom: 50}}>
                <View>
                    <Text style={styles.title}>Share Your Data with a Physician</Text>
                    <Text style={styles.text}>
                        Before you can receive a personalized health assessment, please share your STEDI data with your
                        physician. This allows them to review your results, monitor key health indicators, and provide
                        expert recommendations tailored to your needs.
                    </Text>
                    
                    {/* Access Requests Section */}
                    <View style={{marginTop: 30}}>
                        <Text style={[styles.title, {fontSize: 20}]}>Access Requests</Text>
                        {loadingRequests ? (
                            <Text style={styles.text}>Loading requests...</Text>
                        ) : accessRequests.length > 0 ? (
                            accessRequests.map((request, index) => (
                                <View key={index} style={[styles.textInput, {marginTop: 10, padding: 15}]}>
                                    <Text style={styles.text}>
                                        <Text style={{fontWeight: 'bold'}}>Clinician:</Text> {request.clinicianUsername}
                                    </Text>
                                    <Text style={styles.text}>
                                        <Text style={{fontWeight: 'bold'}}>Status:</Text> {request.status}
                                    </Text>
                                    <Text style={styles.text}>
                                        <Text style={{fontWeight: 'bold'}}>Date:</Text> {request.requestDate}
                                    </Text>
                                    {request.status === 'pending' && (
                                        <TouchableOpacity 
                                            style={[styles.button, {marginTop: 10, backgroundColor: '#ff4444'}]}
                                            onPress={() => handleDeleteRequest(request.clinicianUsername)}
                                        >
                                            <Text style={styles.buttonText}>Delete Request</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))
                        ) : (
                            <Text style={styles.text}>No access requests found.</Text>
                        )}
                    </View>

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
        </ScrollView>
    );
}
