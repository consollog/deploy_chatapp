import React from 'react'
import useConversations from '../../Zustand/useConversations'
import { useSocketContext } from '../../Context/SocketContext'
const Conversation = ({ conversation, lastIdx }) => {
    const { selectedConversation, setSelectedConversation } = useConversations()
    const isselected = selectedConversation?._id === conversation._id
    const { onlinUsers } = useSocketContext()
    const isOnline = onlinUsers.includes(conversation._id)
    // console.log("onlinUser:", onlinUsers)
    return (
        <>
            <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
                ${isselected ? "bg-sky-500" : ""}`}
                onClick={() => setSelectedConversation(conversation)}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className='w-12 rounded-full'>
                        <img src={conversation.profilePic} alt="user avatar" />
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.fullname}</p>
                    </div>
                </div>
            </div>
            <div className='divider my-0 py-0 h-1' />
        </>
    )
}

export default Conversation
