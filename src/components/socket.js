import React, { useContext } from "react";
import io from "socket.io-client";

const socket = io.connect("ws://localhost:3001", {
  transports: ["websocket"], // Use only WebSocket transport
});

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
