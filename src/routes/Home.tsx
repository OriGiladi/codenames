import { observer } from 'mobx-react'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import rootStore from '../rootStore';
import { Socket } from 'socket.io-client';
import { getInitialGameProperties } from '../gameFunctionality/gameInitialization';
const { userStore } = rootStore
const Home = observer(({ socket } : { socket: Socket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [chatRoomID, setChatRoomID] = useState('');
    const InsertUserName = () => {
        userStore.setUserName(userName)
        socket.connect()
        socket.on('connect', () => {
            socket.emit('newUser', { userName, socketID: socket.id});
        });
        socket.emit("join_room", chatRoomID)
        userStore.setChatRoomId(Number(chatRoomID))
        getInitialGameProperties(socket)
        navigate('/board');
    }
    return (
        <>
            <div>enter your name</div>
            <input onChange={(e) => {setUserName(e.target.value)}}></input>
            <div>enter your chatroom</div>
            <input onChange={(e) => {setChatRoomID(e.target.value)}}></input>
            <button onClick={() => {InsertUserName()}}>insert</button>
        </>
    )
})

export default Home