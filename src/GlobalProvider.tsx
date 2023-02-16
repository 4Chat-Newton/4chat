import React, {createContext, useState} from 'react';
import activeRoomContext from "./ActiveRoomContext";
export interface ActiveRoomContextType {
    activeRoom: string;
    setActiveRoom: (activeRoom: string) => void;
    activeRoomId: number;
    setActiveRoomId: (activeRoomId: number) => void;
}
interface GlobalProviderProps {
    children: React.ReactNode;
}

function GlobalProvider(props: GlobalProviderProps)
{
    const [activeRoom, setActiveRoom] = useState('Home');
    const [activeRoomId, setActiveRoomId] = useState(0);

    const value: ActiveRoomContextType = {
        activeRoom: activeRoom,
        setActiveRoom: setActiveRoom,
        activeRoomId: activeRoomId,
        setActiveRoomId: setActiveRoomId,
    };

    return (
        <activeRoomContext.Provider value={value}>
            {props.children}
        </activeRoomContext.Provider>
    );
}

export default GlobalProvider