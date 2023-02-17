import { createContext } from 'react';
import {ActiveRoomContextType} from "./GlobalProvider";

const activeRoomContext = createContext<ActiveRoomContextType>({
    activeRoom: '',
    setActiveRoom: (activeRoom: string) => {},
    activeRoomId: 0,
    setActiveRoomId: (activeRoomId: number) => {},
    oldMessages: [],
    setOldMessages:  (oldMessages: []) => {},
    joinedRooms: [],
    setJoinedRooms:  (joinedRooms: []) => {},
    user: [],
    setUser: (user: []) => {},
});

export default activeRoomContext;
