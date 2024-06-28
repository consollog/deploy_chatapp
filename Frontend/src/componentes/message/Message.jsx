import React, { useContext } from 'react'
import { useAuthContext } from "../../Context/authContext"
import useConversations from '../../Zustand/useConversations'
import { GetTime } from '../../utills/GetTime'

const Message = ({ message }) => {
    const { authuser } = useAuthContext()
    const { selectedConversation } = useConversations()
    const fromMe = authuser._id === message.senderId
    const chatClassName = fromMe ? "chat-end" : "chat-start"
    const formatedTime = GetTime(message.createdAt)
    const profilepic = fromMe ? authuser.profilePic : selectedConversation.profilePic
    const color = fromMe ? "bg-blue-500" : ""

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilepic} alt="Bubble component" />
                </div>
            </div>
            <div className={`chat-bubble text-white ${color}`}>{message.message} </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{formatedTime}</div>
        </div>
    )
}

export default Message
