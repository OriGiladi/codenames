import { observer } from 'mobx-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import rootStore from '../rootStore';
import { getInitialGameProperties } from '../gameFunctionality/gameInitialization';
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
            // attach the session ID to the next reconnection attempts
            socket.auth = { sessionID };
            // store it in the localStorage
            localStorage.setItem('sessionID', sessionID);
            // save the ID of the user
            socket.userName = userName
            // socket.emit('newUser', { userName: socket.userName || "Ori", socketID: socket.id });
            // socket.emit('join_room', chatRoomID);
            userStore.setChatRoomId(Number(chatRoomID));
            //getInitialGameProperties(socket);
            // navigate('/board');
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