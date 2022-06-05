import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_BASE_URL);

export const SocketCtx = React.createContext();

function SocketCtxProvider({ children }) {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("diconnected");
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);
  return <SocketCtx.Provider value={socket}>{children}</SocketCtx.Provider>;
}

export default SocketCtxProvider;
