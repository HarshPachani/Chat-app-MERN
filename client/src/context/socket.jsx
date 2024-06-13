import { createContext, useContext, useMemo } from "react";
import io from 'socket.io-client';

const socketContext = createContext();

const useSocket = () => useContext(socketContext);

const SocketProvider = ({ children }) => {
    const socket = useMemo(() => io(process.env.REACT_APP_SERVER_URL, { withCredentials: true }), []);
    
    return (
        <socketContext.Provider value={socket}>
            { children }
        </socketContext.Provider>
    )
}

export { useSocket, SocketProvider }