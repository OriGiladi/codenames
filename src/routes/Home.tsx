import { observer } from 'mobx-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rootStore from '../rootStore';
import { SessionSocket, user } from '../utils/types';
import { REST_API_BASE_URL } from '../utils/constants';

const { userStore } = rootStore;

const Home = observer(({ socket }: { socket: SessionSocket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [chatRoomID, setChatRoomID] = useState('');

    const InsertUserProperties = async () => {
        userStore.setUserName(userName);
        const res = await fetch(`${REST_API_BASE_URL}/user/userName/${userName}`)
        const data: user = await res.json()
        if(data.user === 'User not found'){
            socket.auth = { userName };
            socket.connect();

            socket.on('session', ({ sessionID }) => {
                socket.auth = { sessionID };
                sessionStorage.setItem('sessionID', sessionID);
                socket.userName = userName
                userStore.setChatRoomId(Number(chatRoomID));
                navigate('/waitingRoom');
            });
        }
        else{
            alert('someone is using this nickname right now, find something else')
            // TODO: make it a dialog
        }
    };

    return (
        <>
            <div>enter your name</div>
            <input onChange={(e) => setUserName(e.target.value)} />
            <div>enter your chatroom</div>
            <input onChange={(e) => {setChatRoomID(e.target.value)}}></input>

            <button onClick={() => {InsertUserProperties()}}>insert</button>
        </>
    );
});

export default Home;