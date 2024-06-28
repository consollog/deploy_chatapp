import React, { useState } from 'react'
import useConversations from '../Zustand/useConversations'
import { BaseUrl } from '../componentes/BaseUrl'
import toast from 'react-hot-toast'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversations()

    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await fetch(`${BaseUrl}/api/message/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message }),
                credentials: 'include'
            })

            const data = await res.json()
            if (data.error) throw new Error(data.error)
            setMessages([...messages, data])
        } catch (error) {
            toast.error(error.messages)
        } finally {
            setLoading(false)
        }
    }
    return { loading, sendMessage }
}

export default useSendMessage
