import './WaitingRoom.css'
import { useEffect, useState } from "react";
import { Part, Parts, SessionSocket, role, team, user } from "../../utils/types";
import { useNavigate } from 'react-router-dom';
import { getInitialGameProperties } from "../../gameFunctionality/gameInitialization";
import rootStore from "../../rootStore";
import axios from "axios";
import { REST_API_BASE_URL } from "../../utils/constants";
import { getHeaders } from "../../utils/sdk";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const { userStore, onlineUsersStore } = rootStore;

const WaitingRoom = observer(({socket}: {socket: SessionSocket}) => {
    const navigate = useNavigate();
    const [parts, setParts] = useState<Parts | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.emit('newUser', 
        { userName: socket.userName, socketID: socket.id}, 
         userStore.chatRoom); // when redirecting from Home.tsx
        socket.emit('join_room', userStore.chatRoom);
    }, [])
    useEffect(() => {
        const sessionID = sessionStorage.getItem('sessionID');
        if (sessionID) {
            socket.auth = { sessionID };
            socket.connect(); // when refreshing
            socket.on('connect', () => {
                socket.emit('newUser', 
                { userName: userStore.userName || 
                sessionStorage.getItem('userName'), 
                socketID: socket.id}, userStore.chatRoom);
            });
        }
        socket.on('updatingUsersResponse', (users: user []) => {
            onlineUsersStore.setOnlineUsers(users)
            setLoading(false); // Data has been loaded, sets loading to false
        });
        socket.on('partsResponse', (parts: Parts) => {
            setParts(parts)
            if(parts?.redP && parts?.redCM && parts?.blueP && parts?.blueCM){
                if(userStore.isHost()){   
                    getInitialGameProperties(socket)
                }
                navigate('/board')
            }
        });
    }, [socket])

    async function choosePart(part: Part){
        const roleAndTeam = getRoleAndTeamFromPart(part)
        userStore.setRole(roleAndTeam?.role as role)
        userStore.setTeam(roleAndTeam?.team as team)
        userStore.setHasChosenRole(true)

        const userProperties: user = {
            userName: userStore.userName,
            role: userStore.role as role,
            team: userStore.team as team,
        }
        try {
            await axios.patch(`${REST_API_BASE_URL}/user`, userProperties, {
                headers: getHeaders()
            });
            sessionStorage.setItem('userName', userStore.userName) 
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }
        socket.emit("getChosenParts", userStore.chatRoom)
    }

    function getRoleAndTeamFromPart(part: Part){
        if(part === 'blueCM')
            return {role: 'code-master', team: "blue"}
        if(part === 'blueP')
            return {role: 'player', team: "blue"}
        if(part === 'redCM')
            return {role: 'code-master', team: "red"}
        if(part === 'redP')
            return {role: 'player', team: "red"}
    }

    const icons = Array.from({ length: onlineUsersStore.onlineUsers?.length as number }, (_, index) => (
        <FontAwesomeIcon key={index} icon={faUser} style={{ margin: '0 10px', fontSize: '24px' }} />
    ));

    return (
        <>
            <div className="container">
                <div id='data'>
                    {loading ? 
                        (
                            <div>Loading...</div>
                        ) :
                        ( 
                            <>
                                <button
                                disabled={parts?.blueCM || userStore.hasChosenRole} 
                                type="button" 
                                className="btn btn-secondary card-button blue" 
                                onClick={() => {
                                    choosePart('blueCM')
                                } }
                                >
                                    Code Master
                                </button>
                                <button 
                                disabled={parts?.blueP || userStore.hasChosenRole} 
                                type="button" 
                                className="btn btn-secondary card-button blue" 
                                onClick={() => {
                                    choosePart('blueP')
                                } }
                                >
                                    Player
                                </button>
                                <button 
                                disabled={parts?.redCM || userStore.hasChosenRole} 
                                type="button" 
                                className="btn btn-secondary card-button red" 
                                onClick={() => {
                                    choosePart('redCM')
                                } }
                                >
                                    Code Master
                                </button>
                                <button 
                                disabled={parts?.redP || userStore.hasChosenRole} 
                                type="button" 
                                className="btn btn-secondary card-button red" 
                                onClick={() => {
                                    choosePart('redP')
                                } }
                                >
                                    Player
                                </button>
                                <div style={{ marginBottom: '10px', marginTop: '10px' }}>
                                        {icons}
                                </div>

                                <div>{onlineUsersStore.onlineUsers?.length} / 4 players have joined the game... </div> 
                            </>    
                        )
                    }
                </div>
            </div>

        </>
    )
})

export default WaitingRoom