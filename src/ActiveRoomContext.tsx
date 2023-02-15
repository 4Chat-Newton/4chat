import { createContext } from 'react';
import {ActiveRoomContextType} from "./GlobalProvider";

const activeRoomContext = createContext<ActiveRoomContextType>({
    activeRoom: '',
    setActiveRoom: (theme: string) => {},
});

export default activeRoomContext;
