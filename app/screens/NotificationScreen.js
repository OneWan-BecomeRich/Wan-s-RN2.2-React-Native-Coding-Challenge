import {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Platform} from 'react-native';
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from 'expo-notifications';
import {useThemeStyles} from '../components/Styles';
import {useLoginContext} from '../components/LoginContext';

/* TODO:
 *  - Add support for notifications by adding these functions from the example code:
 *     - Notifications.setNotificationHandler
 *     - sendPushNotification
 *        - Export this function (for testing purposes)
 *        - Include 'username' in the data object
 *     - handleRegistrationError
 *     - registerForPushNotificationsAsync
 *  - Finish building out the other functions according to the comments below
 */

/** Retrieves the push token for a given user from the API
 * @param {string} username - The username of the target user to get the push token for
 * @param {string} sessionToken - The session token of the current user, used for authentication
 * @returns {Promise<string|null>} - The push token for the target user, or null if it does not exist
 */
export const getPushToken = async (username, sessionToken) => {
    /* TODO:
     *  - Make a GET request to https://dev.stedi.me/pushtokentestonly/{username}
     *  - Include 'suresteps.session.token' in the headers
     */
    return null;
}

/** Saves the push token to the API for a given user.
 * @param userName - The username of the user to save the push token for
 * @param sessionToken - The session token of the current user, used for authentication
 * @param pushToken - The user's current push token
 */
export const savePushTokenToAPI = async (userName, sessionToken, pushToken) => {
    /* TODO:
     *  - Check if the push token is already saved for the user by calling getPushToken
     *  - If the current push token is different from the one in the API, update it:
     *     - Make a PATCH request to https://dev.stedi.me/user/{userName}
     *     - Include 'suresteps.session.token' in the headers
     *     - Include 'expoPushToken' in the body
     */
}

export default function NotificationScreen() {
    const [notification, setNotification] = useState(null);
    const [sending, setSending] = useState(false);
    const styles = useThemeStyles();
    const {userName, sessionToken} = useLoginContext();

    useEffect(() => {
        /* TODO:
         *  Add the code from the useEffect in the example code here, but instead of calling setExpoPushToken after
         *  registerForPushNotificationsAsync, save the new push token to the API using savePushTokenToAPI.
         */
        console.warn('TODO: Implement push notification registration and saving token to API');
    }, []);

    /** Sends a push notification to the physician with the user's name. */
    const sendDataToPhysician = async () => {
        /* TODO:
         *  - Start by setting 'sending' to true (this will disable the button temporarily)
         *  - Retrieve the physician's push token using getPushToken
         *  - Send a push notification to the physician using sendPushNotification
         *  - Finally, change 'sending' back to false
         */
    }

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
