import React, {createContext, useState} from 'react';
import activeRoomContext from "./ActiveRoomContext";
export interface ActiveRoomContextType {
    activeRoom: string;
    setActiveRoom: (activeRoom: string) => void;
}
interface GlobalProviderProps {
    children: React.ReactNode;
}

function GlobalProvider(props: GlobalProviderProps)
{
    const [activeRoom, setActiveRoom] = useState('Home');

    const value: ActiveRoomContextType = {
        activeRoom: activeRoom,
        setActiveRoom: setActiveRoom,
    };

    return (
        <activeRoomContext.Provider value={value}>
            {props.children}
        </activeRoomContext.Provider>
    );
}

export default GlobalProvider