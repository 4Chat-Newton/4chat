import React, {createContext, useState} from 'react';
import activeRoomContext from "./ActiveRoomContext";

export interface ActiveRoomContextType {
    activeRoom: string;
    setActiveRoom: (activeRoom: string) => void;
    botMessage: string;
    setBotMessage: (message: string) => void;
}

interface GlobalProviderProps {
    children: React.ReactNode;
}

function GlobalProvider(props: GlobalProviderProps)
{
    const [activeRoom, setActiveRoom] = useState('Home');
    const [botMessage, setBotMessage] = useState('');

    const value: ActiveRoomContextType = {
        activeRoom: activeRoom,
        setActiveRoom: setActiveRoom,
        botMessage: botMessage,
        setBotMessage: setBotMessage,
    };

    return (
        <activeRoomContext.Provider value={value}>
            {props.children}
        </activeRoomContext.Provider>
    );
}

export default GlobalProvider