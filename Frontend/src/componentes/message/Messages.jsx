import React, { useEffect, useRef } from 'react'
import useGetMeassage from '../../Hookes/useGetMessage.js'
import MessageSkeletons from '../Skeletons/MessageSkeletons.jsx'
import Message from './Message.jsx'
import useListenMessage from '../../Hookes/useListenMessage.js'

const Messages = () => {
    const { messages, loading } = useGetMeassage()
    const lastMessageRef = useRef()
    // console.log(messages)
    useListenMessage();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [messages])

    return (
        <div className='px-4 overflow-auto flex-1'>
            {!loading && messages.length > 0 && messages.map((message) =>
                <div key={message._id} ref={lastMessageRef}>
                    <Message message={message} />
                </div>
            )}
            {loading && [...Array(3)].map((_, idx) => <MessageSkeletons key={idx} />)}
            {!loading && messages.length === 0 && (
                <div className='flex items-center justify-center h-full w-full'>
                    <p className='text-center text-white'>Send a Message To Start Conversations</p>
                </div>
            )}
        </div>
    )
}

export default Messages
