import React, { useEffect } from 'react'
import { useSocketContext } from "../Context/SocketContext.jsx"
import useConversations from "../Zustand/useConversations.js"
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessage = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversations()

    useEffect(() => {
        socket.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound)
            sound.play()
            setMessages([...messages, newMessage])
        }, [socket, messages, setMessages])
    })

}

export default useListenMessage
