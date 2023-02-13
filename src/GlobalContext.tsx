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
    room: Room[];
}

interface Room {
    id: number
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);
export const AuthContext: React.FC<GlobalProviderProps> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState([])
    const [room, setRoom] = useState([])

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

    const findRoom = async (roomName: string) => {
        await fetch("http://localhost:8080/data/room/" + roomName)
            .then((res) => res.json())
            .then((data) => {
                // console.log('r10',data)
                //let room = data.find(roomName);
                // setRoom(rum)
                console.log(data.id)
            

                //setRoom(data.id)
                localStorage.setItem("room", data.id)
                //setRoom(result)
            });
    };

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                user,
                room
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;