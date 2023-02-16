import React, {createContext, useState} from 'react';
import activeRoomContext from "./ActiveRoomContext";

import {array} from "yup";
export interface ActiveRoomContextType {
    activeRoom: string;
    setActiveRoom: (activeRoom: string) => void;
    activeRoomId: number;
    setActiveRoomId: (activeRoomId: number) => void;
    oldMessages: any[],
    setOldMessages: (oldMessages: []) => void;
    user: any[],
    setUser: (user: []) => void;
    joinedRooms: any[],
    setJoinedRooms:  (joinedRooms: []) => void,
}
interface GlobalProviderProps {
    children: React.ReactNode;
}

function GlobalProvider(props: GlobalProviderProps)
{
    const [activeRoom, setActiveRoom] = useState('Home');
    const [activeRoomId, setActiveRoomId] = useState(0);
    const [oldMessages, setOldMessages] = useState([]);
    const [joinedRooms, setJoinedRooms] = useState([]);
    const [user, setUser] = useState([]);


    const value: ActiveRoomContextType = {
        activeRoom: activeRoom,
        setActiveRoom: setActiveRoom,
        activeRoomId: activeRoomId,
        setActiveRoomId: setActiveRoomId,
        oldMessages: oldMessages,
        setOldMessages: setOldMessages,
        joinedRooms: joinedRooms,
        setJoinedRooms: setJoinedRooms,
        user: user,
        setUser: setUser,
    };

    return (
        <activeRoomContext.Provider value={value}>
            {props.children}
        </activeRoomContext.Provider>
    );
}

export default GlobalProvider