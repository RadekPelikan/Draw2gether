import {createContext} from "react"
import io from "socket.io-client";

export const socket = io.connect(process.env.REACT_APP_SERVER_IP);
export const SocketContext = createContext();