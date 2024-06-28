import React, { useEffect, useState } from 'react'
import useConversations from '../Zustand/useConversations'
import toast from 'react-hot-toast'
import { BaseUrl } from '../componentes/BaseUrl'

const useGetMeassage = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversations()
    // console.log("messages:", messages)

    useEffect(() => {
        const getmeassage = async () => {
            setLoading(true)
            try {
                const res = await fetch(`${BaseUrl}/api/message/${selectedConversation._id}`, {
                    credentials: 'include'
                })
                const data = await res.json()
                if (data.error) throw new Error(data.error)
                setMessages(data)

            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        if (selectedConversation?._id) getmeassage()
    }, [selectedConversation?._id, setMessages])
    return { messages, loading }
}

export default useGetMeassage
