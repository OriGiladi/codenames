import { observer } from 'mobx-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rootStore from '../rootStore';
import { role, SessionSocket, team, user } from '../utils/types';
import { REST_API_BASE_URL } from '../utils/constants';
import axios from 'axios';
import { getHeaders } from '../utils/sdk';
import { Button } from '@chakra-ui/react';

const { userStore } = rootStore;

const Home = observer(({ socket }: { socket: SessionSocket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [chatRoom, setChatRoom] = useState('');

    const InsertUserProperties = async () => {

        userStore.setUserName(userName);
        const res = await fetch(`${REST_API_BASE_URL}/user/userName/${userName}`)
        const data: {user: user | string} = await res.json()
        const user: user = data.user as user
        const usersInChatRoomJson = await fetch(`${REST_API_BASE_URL}/user/chatRoom/${chatRoom}`)
        const usersInChatRoom = await usersInChatRoomJson.json()
        if(data.user === 'User not found' && usersInChatRoom.length < 4){

            const userProperties: user = {
                userName: userStore.userName,
                chatRoom: chatRoom,
                isOnline: true
            }
            try {
                await axios.post(`${REST_API_BASE_URL}/user`, userProperties, {
                    headers: getHeaders()
                });
                sessionStorage.setItem('userName', userStore.userName) 
            } catch (error) {
                console.error(error);
                return { response: false, data: null };
            }
            
            socket.auth = { userName };
            socket.connect();
            
            socket.on('session', ({ sessionID }) => {
                socket.auth = { sessionID };
                sessionStorage.setItem('sessionID', sessionID);
                sessionStorage.setItem('userName', userStore.userName)
                socket.userName = userName
                userStore.setChatRoom(chatRoom);
                socket.emit('join_room',chatRoom )
                navigate('/waitingRoom');
            });
        }
        
        else if(user.userName === userName &&
            user.chatRoom === chatRoom && 
            user.isOnline === false){
            socket.auth = { userName };
            socket.connect();
            const initializedGamePropertiesJson = await fetch(`${REST_API_BASE_URL}/gameProperties/${chatRoom}`)
            const initializedGameProperties = await initializedGamePropertiesJson.json()
            socket.on('session', ({ sessionID }) => {
                socket.auth = { sessionID };
                sessionStorage.setItem('sessionID', sessionID);
                socket.userName = userName
                userStore.setChatRoom(user.chatRoom as string);
                userStore.setRole(user.role as role)
                userStore.setIsOnline(user.isOnline as boolean)
                userStore.setTeam(user.team as team)
                socket.emit('newUser', { userName: userStore.userName, socketID: socket.id}, userStore.chatRoom);
                socket.emit("updateGameProperties", 'none' ,userStore.userName) // just to get the game properties from the server
                sessionStorage.setItem('userName', userStore.userName)
                if(initializedGameProperties.length > 0){
                    navigate('/board');
                }
                else{
                    navigate('/waitingRoom');
                }            
            });
        }
        else if(usersInChatRoom.length >= 4){
            alert('sorry, the room is full')
        }
        else{
            console.log(usersInChatRoom)
            alert('someone is using this nickname right now, find something else')
            // TODO: make it a dialog
        }
    };

    return (
        <>
            <div>enter your name</div>
            <input onChange={(e) => setUserName(e.target.value)} />
            <div>enter your chatroom</div>
            <input onChange={(e) => {setChatRoom(e.target.value)}}></input>

            <Button isDisabled={userName === '' || chatRoom === ''} onClick={() => {InsertUserProperties()}}>insert</Button>
        </>
    );
});

export default Home;