"use client";

import { createContext, useContext, useEffect, useState, FC, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

interface WebSocketContextValue {
    socket: Socket | null;
}

const initialSocket: WebSocketContextValue = {
    socket: null,
};

export const WebSocketContext = createContext(initialSocket);

export default function WebSocketProvider({ children }: { children: ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        // Khởi tạo WebSocket connection
        const newSocket = io("http://localhost:5000", {
            autoConnect: false,
            transports: ["websocket"],
        });

        setSocket(newSocket);

        return () => {
            newSocket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{ socket }}>
            {children}
        </WebSocketContext.Provider>
    );
}
