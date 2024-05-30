import { observer } from 'mobx-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rootStore from '../rootStore';
import { SessionSocket } from '../utils/types';

const { userStore } = rootStore;

const Home = observer(({ socket }: { socket: SessionSocket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [chatRoomID, setChatRoomID] = useState('');

    const InsertUserProperties = () => {
        userStore.setUserName(userName);
        socket.auth = { userName };
        socket.connect();

        socket.on('session', ({ sessionID }) => {
            socket.auth = { sessionID };
            sessionStorage.setItem('sessionID', sessionID);
            socket.userName = userName
            userStore.setChatRoomId(Number(chatRoomID));
            navigate('/waitingRoom');
        });
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