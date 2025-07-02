import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLoginContext} from './LoginContext';

// Check for a session token in AsyncStorage. If a valid token is found, set the user as logged in
export const getSessionToken = async () => {
    const {setLoggedIn, setUserName, setSessionToken} = useLoginContext();
    const sessionToken = await AsyncStorage.getItem('sessionToken');
    console.info('sessionToken:', sessionToken);

    if (sessionToken) {
        const validateResponse = await fetch('https://dev.stedi.me/validate/' + sessionToken,
            {
                method: 'GET',
                headers: {
                    'content-type': 'text/plain',
                }
            }
        );

        if (validateResponse.status === 200) { // 200 means the token is valid
            const userName = await validateResponse.text();
            setUserName(userName);
            setSessionToken(sessionToken);
            console.info('Logged in as', userName);
            setLoggedIn(true);
        } else {
            console.info('Invalid session token');
            await AsyncStorage.removeItem('sessionToken');
        }
    }
}

// Log the user out by removing data from AsyncStorage
export async function handleLogout(setLoggedIn) {
    await AsyncStorage.removeItem('sessionToken');
    setLoggedIn(false);
    console.info('Logged out');
}

// Delete the user's account by sending a DELETE request to the server
export function handleDeleteUser() {
    const {userName, sessionToken, setLoggedIn} = useLoginContext();
    fetch('https://dev.stedi.me/user/' + userName,
        {
            method: 'DELETE',
            headers: {
                'content-type': 'text/plain',
                'suresteps.session.token': sessionToken,
            },
        }).then(response => {
        if (response.status === 200) {
            console.warn('Deleted user', userName);
            handleLogout(setLoggedIn);
        } else {
            console.error('Failed to delete user', userName);
        }
    });
}