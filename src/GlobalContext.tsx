import React, { createContext, useState, useEffect } from "react";
interface GlobalProviderProps {
    children: React.ReactNode;
}
interface User {
    id: string
}

interface GlobalContextProps {
    isLoggedIn: boolean;
    user: User[];
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);
export const AuthContext: React.FC<GlobalProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState([])

        useEffect(() => {
        loadLoggedInUser()
    }, []);

    const loadLoggedInUser = () => {
        fetch('/data/login', {
            method: 'GET'
        }).then(function (response) {
            return response.json();
        }).then(function (myJson) {
            // setUser(myJson)
            setIsLoggedIn(myJson.loggedIn)
        });
    }

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                user
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;