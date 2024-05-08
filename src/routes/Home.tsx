import { observer } from 'mobx-react'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import rootStore from '../rootStore';
import { Socket } from 'socket.io-client';
import { getInitialGameProperties } from '../gameFunctionality/gameInitialization';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { role, team } from '../utils/types';
const { userStore } = rootStore
const Home = observer(({ socket } : { socket: Socket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [chatRoomID, setChatRoomID] = useState('');
    const [role, setRole] = useState<role | undefined>();
    const [team, setTeam] = useState<team | undefined>();

    const InsertUserProperties = () => {
        userStore.setUserName(userName)
        userStore.setRole(role as role)
        userStore.setTeam(team as team)
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
            <RadioGroup onChange={setRole as React.Dispatch<React.SetStateAction<string | undefined>>} 
            value={role}>
                <Stack direction='row'>
                    <Radio value='code-master'>Code Master</Radio>
                    <Radio value='player'>Player</Radio>
                </Stack>
            </RadioGroup>
            <RadioGroup onChange={setTeam as React.Dispatch<React.SetStateAction<string | undefined>>} 
            value={team}>
                <Stack direction='row'>
                    <Radio value='red'>Red</Radio>
                    <Radio value='blue'>Blue</Radio>
                </Stack>
            </RadioGroup>
            <button onClick={() => {InsertUserProperties()}}>insert</button>
        </>
    )
})

export default Home