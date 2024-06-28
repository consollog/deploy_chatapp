import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authContext"
import { io } from "socket.io-client";

const SocketContext = createContext()
export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const [onlinUsers, setOnlineUsers] = useState([])
    const { authuser } = useAuthContext()

    useEffect(() => {
        if (authuser) {
            const socket = io("https://deploy-chatapp.onrender.com", {
                query: {
                    userId: authuser._id,
                },
            })
            setSocket(socket)

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return () => socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authuser])



    return (
        <SocketContext.Provider value={{ socket, onlinUsers }}>{children}</SocketContext.Provider>
    )
}