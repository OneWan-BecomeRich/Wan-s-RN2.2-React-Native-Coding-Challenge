import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import NotificationScreen from '../app/screens/NotificationScreen';
import { useLoginContext } from '../app/components/LoginContext';
import * as Notifications from 'expo-notifications';
import * as NotificationScreenModule from '../app/screens/NotificationScreen';

jest.mock('../app/components/LoginContext', () => ({
    useLoginContext: jest.fn(),
}));

jest.mock('expo-constants', () => ({
    expoConfig: {
        extra: {
            eas: {
                projectId: 'test-project-id',
            },
        },
    },
}));

jest.mock('expo-notifications', () => ({
    getPermissionsAsync: jest.fn(),
    requestPermissionsAsync: jest.fn(),
    getExpoPushTokenAsync: jest.fn(),
    setNotificationChannelAsync: jest.fn(),
    addNotificationReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
    addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
    setNotificationHandler: jest.fn(),
    AndroidImportance: {
        MAX: 'max',
    },
}));

jest.mock('expo-device', () => ({
    isDevice: true,
}));

global.fetch = jest.fn();

const testErrors = []; // Array to store error messages
const addTestError = (errorMessage) => {
    if (!testErrors.includes(errorMessage)) {
        testErrors.push(errorMessage);
    }
}

describe('sendPushNotification function', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({ ok: true });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should send the a message with the correct fields', async () => {
        await NotificationScreenModule.sendPushNotification('push-token', 'myUser');
        const body = JSON.parse(fetch.mock.calls[0][1].body);
        if (!body.to) addTestError('[sendPushNotification] Message "to" field is undefined');
        expect(body.to).toBeDefined();
        if (!body.title) addTestError('[sendPushNotification] Message "title" field is undefined');
        expect(body.title).toBeDefined();
        if (!body.body) addTestError('[sendPushNotification] Message "body" field is undefined');
        expect(body.body).toBeDefined();
        if (!body.data) addTestError('[sendPushNotification] Message "data" field is undefined');
        expect(body.data).toBeDefined();
        if (!body.data.username) addTestError('[sendPushNotification] Message "data" field should include a "username" field (it is case-sensitive)');
        expect(body.data.username).toBeDefined();
        if (body.data.username !== 'myUser') addTestError('[sendPushNotification] "username" field should be taken from the function argument');
        expect(body.data.username).toBe('myUser');
    });
    it('should send a POST request', async () => {
        await NotificationScreenModule.sendPushNotification('push-token', 'myUser');
        if (!fetch.mock.calls[0]) addTestError('[sendPushNotification] Unable to find a fetch call after calling sendPushNotification');
        expect(fetch.mock.calls[0]).toBeDefined();
        if (!fetch.mock.calls[0][1].method || fetch.mock.calls[0][1].method !== 'POST') addTestError('[sendPushNotification] Fetch method should be POST');
        expect(fetch.mock.calls[0][1].method).toBe('POST');
    });
    it('should send a request to the correct URL', async () => {
        await NotificationScreenModule.sendPushNotification('push-token', 'myUser');
        if (!fetch.mock.calls[0][0] || fetch.mock.calls[0][0] !== 'https://exp.host/--/api/v2/push/send') addTestError('[sendPushNotification] Fetch URL should be https://exp.host/--/api/v2/push/send');
        expect(fetch.mock.calls[0][0]).toBe('https://exp.host/--/api/v2/push/send');
    });
});

describe('getPushToken function', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => 'token123' });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should send a GET request', async () => {
        await NotificationScreenModule.getPushToken('myUser', 'session-token');
        if (!fetch.mock.calls[0]) addTestError('[getPushToken] Unable to find a fetch call after calling getPushToken');
        expect(fetch.mock.calls[0]).toBeDefined();
        if (!fetch.mock.calls[0][1] || fetch.mock.calls[0][1].method !== 'GET') addTestError('[getPushToken] Fetch method should be GET');
        expect(fetch.mock.calls[0][1].method).toBe('GET');
    });
    it('should send a request to the correct URL', async () => {
        await NotificationScreenModule.getPushToken('myUser', 'session-token');
        if (!fetch.mock.calls[0][0] || fetch.mock.calls[0][0] !== 'https://dev.stedi.me/pushtokentestonly/myUser') addTestError('[getPushToken] Fetch URL should be https://dev.stedi.me/pushtokentestonly/{username}');
        expect(fetch.mock.calls[0][0]).toBe('https://dev.stedi.me/pushtokentestonly/myUser');
    });
    it('should return the push token from the response', async () => {
        const result = await NotificationScreenModule.getPushToken('myUser', 'session-token');
        if (!result || result !== 'token123') addTestError('[getPushToken] The function should return the push token from the response');
        expect(result).toBe('token123');
    });
});

describe('savePushTokenToAPI function', () => {
    beforeEach(() => {
        global.fetch = jest.fn((url, opts) => {
            if (opts && opts.method === 'GET') {
                return Promise.resolve({ ok: true, json: async () => 'oldToken' });
            }
            return Promise.resolve({ ok: true });
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should call getPushToken to retrieve the old token', async () => {
        jest.spyOn(NotificationScreenModule, 'getPushToken').mockImplementation(async () => 'oldToken');
        await NotificationScreenModule.savePushTokenToAPI('myUser', 'session-token', 'newToken');
        if (!NotificationScreenModule.getPushToken) addTestError('[savePushTokenToAPI] Unable to find initial call to getPushToken');
        expect(NotificationScreenModule.getPushToken).toHaveBeenCalled
    });
    it('should send a PATCH request', async () => {
        jest.spyOn(NotificationScreenModule, 'getPushToken').mockImplementation(async () => 'oldToken');
        await NotificationScreenModule.savePushTokenToAPI('myUser', 'session-token', 'newToken');
        const secondCall = fetch.mock.calls[1];
        if (!secondCall) addTestError('[savePushTokenToAPI] Unable to find a fetch call after calling savePushTokenToAPI');
        expect(secondCall).toBeDefined();
        if (!secondCall[1] || secondCall[1].method !== 'PATCH') addTestError('[savePushTokenToAPI] Fetch method should be PATCH');
        expect(secondCall[1].method).toBe('PATCH');
    });
    it('should send a request to the correct URL', async () => {
        jest.spyOn(NotificationScreenModule, 'getPushToken').mockImplementation(async () => 'oldToken');
        await NotificationScreenModule.savePushTokenToAPI('myUser', 'session-token', 'newToken');
        if (!fetch.mock.calls[0][0] || fetch.mock.calls[0][0] !== 'https://dev.stedi.me/pushtokentestonly/myUser') addTestError('[savePushTokenToAPI] Fetch URL should be https://dev.stedi.me/pushtokentestonly/{username}');
        expect(fetch.mock.calls[0][0]).toBe('https://dev.stedi.me/pushtokentestonly/myUser');
    });
});

describe('Full functionality test', () => {
    // Suppress specific console.error warnings related to act() in tests
    const originalError = console.error;
    beforeAll(() => {
        console.error = (...args) => {
            if (/Warning: An update to .* inside a test was not wrapped in act/.test(args[0])) {
                return;
            }
            originalError.call(console, ...args);
        };
    });
    afterAll(() => {
        console.error = originalError;
    });

    // Setup mocks for Notifications and LoginContext
    beforeEach(() => {
        jest.clearAllMocks();

        Notifications.getPermissionsAsync.mockResolvedValue({status: 'granted'});
        Notifications.requestPermissionsAsync.mockResolvedValue({status: 'granted'});
        Notifications.getExpoPushTokenAsync.mockResolvedValue({data: 'test-push-token'});
        Notifications.setNotificationChannelAsync.mockResolvedValue();
        Notifications.addNotificationReceivedListener.mockReturnValue({remove: jest.fn()});
        Notifications.addNotificationResponseReceivedListener.mockReturnValue({remove: jest.fn()});

        useLoginContext.mockReturnValue({
            userName: 'test-user',
            sessionToken: 'test-token',
        });
    });

    it('sends a push notification when the button is pressed', async () => {
        fetch.mockImplementation((url, opts) => {
            if (url.includes('pushtokentestonly')) {
                return Promise.resolve({ ok: true, json: async () => 'physician-token' });
            }
            if (opts && opts.method === 'PATCH') {
                return Promise.resolve({ ok: true });
            }
            // POST to push notification
            return Promise.resolve({ ok: true });
        });

        const utils = render(<NotificationScreen />);
        const button = utils.getByText('Send Data to a Physician');
        await act(async () => {
            fireEvent.press(button);
        });

        await waitFor(() => {
            const matchingCall = fetch.mock.calls.find(call => call[0] === 'https://exp.host/--/api/v2/push/send');
            if (!matchingCall) addTestError('[Full functionality test] Unable to find a fetch call to https://exp.host/--/api/v2/push/send');
            expect(matchingCall).toBeDefined();

            const options = matchingCall[1];
            if (!options) addTestError('[Full functionality test] Fetch options are undefined (this is the method, headers, body, etc. of a fetch call)')
            expect(options).toBeDefined();
            if (!options.method || options.method !== 'POST') addTestError('[Full functionality test] Fetch method should be POST');
            expect(options.method).toBe('POST');

            const body = JSON.parse(options.body);
            if (!body.to) addTestError('[Full functionality test] Message "to" field is undefined');
            else if (body.to !== 'physician-token') addTestError('[Full functionality test] Message "to" field should be the physician push token');
            expect(body.to).toBe('physician-token');
            if (!body.title) addTestError('[Full functionality test] Message "title" field is undefined');
            expect(body.title).toBeDefined();
            if (!body.body) addTestError('[Full functionality test] Message "body" field is undefined');
            expect(body.body).toBeDefined();
            if (!body.data) addTestError('[Full functionality test] Message "data" field is undefined');
            expect(body.data).toBeDefined();
            if (!body.data.username) addTestError('[Full functionality test] Message "data" field should include a "username" field (it is case-sensitive)');
            else if (body.data.username !== 'test-user') addTestError('[Full functionality test] Message "data.username" field should be the username from the LoginContext');
            expect(body.data.username).toBe('test-user');
        });
    });
});

afterAll(() => {
    if (testErrors.length > 0) {
        let message = '\n=============================== TEST FAILURES SUMMARY ===============================';
        message += `\n${testErrors.length} test(s) failed:`;
        testErrors.forEach((error) => message += `\n\t● ${error}`);
        message += '\nSee logs below for more details.';
        message += '\n=====================================================================================';
        console.error(message);
    }
});
