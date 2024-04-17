import { observer } from 'mobx-react'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import rootStore from '../rootStore';
import { Socket } from 'socket.io-client';
import { getInitialGameProperties } from '../gameFunctionality/gameInitialization';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { role } from '../rootStore/UserStore';
const { userStore } = rootStore
const Home = observer(({ socket } : { socket: Socket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [chatRoomID, setChatRoomID] = useState('');
    const [role, setRole] = useState<role | undefined>(undefined);
    const InsertUserName = () => {
        userStore.setUserName(userName)
        userStore.setRole(role as role)
        socket.connect()
        socket.on('connect', () => {
            socket.emit('newUser', { userName, socketID: socket.id });
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
            <div>enter your role</div>
            <RadioGroup onChange={setRole} value={role}>
                <Stack direction='row'>
                    <Radio value='code-master'>Code Master</Radio>
                    <Radio value='player'>Player</Radio>
                </Stack>
            </RadioGroup>
            <button onClick={() => {InsertUserName()}}>insert</button>
        </>
    )
})

export default Home