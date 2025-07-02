import {createContext, useContext, useState} from "react";

const LoginContext = createContext(null);

export const LoginProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [sessionToken, setSessionToken] = useState('');

    return (
        <LoginContext.Provider value={{loggedIn, setLoggedIn, userName, setUserName, sessionToken, setSessionToken}}>
            {children}
        </LoginContext.Provider>
    );
}

export const useLoginContext = () => {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLoginContext must be used within a LoginProvider');
    }
    return context;
}
