import { useEffect, useState } from 'react'
import ChatBar from './ChatBar';
import ChatFooter from './ChatFooter';
import ChatBody from './ChatBody';
import './ChatRoom.css';
import { Socket } from 'socket.io-client';
import { observer } from 'mobx-react';
import { Message } from '../../utils/types';

const ChatRoom = observer(({ socket } : { socket : Socket }) => {
    const [messages, setMessages] = useState<Message []>([]);
    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);
    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody messages={messages}/>
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
})

export default ChatRoom