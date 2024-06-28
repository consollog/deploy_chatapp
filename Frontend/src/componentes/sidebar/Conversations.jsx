import React from 'react'
import Conversation from "./Conversation.jsx"
import useGetConnections from '../../Hookes/useGetConversations.js'

const Conversations = () => {
    const { loading, conversations } = useGetConnections();
    // console.log("conversations:", conversations)
    return (
        <div className='py-2 flex flex-col overflow-auto'>
            {conversations.map((conversation, idx) => (
                <Conversation
                    key={conversation._id}
                    conversation={conversation}
                    lastIdx={idx === conversation.length - 1}
                />
            ))}
            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    )
}

export default Conversations
