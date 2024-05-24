import { useEffect, useState } from "react";
import { Part, Parts, SessionSocket, role, socketUser, team } from "../utils/types";
import { useNavigate } from 'react-router-dom';
import { getInitialGameProperties } from "../gameFunctionality/gameInitialization";
import rootStore from "../rootStore";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { getHeaders } from "../utils/sdk";
const { userStore } = rootStore;

function WaitingRoom({socket}: {socket: SessionSocket}) {
    const navigate = useNavigate();
    const [playersOnline, setPlayersOnline] = useState(0);
    const [parts, setParts] = useState<Parts | undefined>();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        socket.emit('newUser', { userName: socket.userName || "Ori", socketID: socket.id });
        socket.emit('join_room', userStore.chatRoomId);
    }, [])
    useEffect(() => {
        socket.on('updatingUsersResponse', (players: socketUser []) => {
            setPlayersOnline(players.length)
            setLoading(false); // Data has been loaded, sets loading to false
        });
        socket.on('partsResponse', (parts: Parts) => {
            setParts(parts)
            if(parts?.redP && parts?.redCM && parts?.blueP && parts?.blueCM){
                getInitialGameProperties(socket) 
                navigate('/board')
            }
        });
    }, [socket])

    async function choosePart(part: Part){
        const roleAndTeam = getRoleAndTeamFromPart(part)
        userStore.setRole(roleAndTeam?.role as role)
        userStore.setTeam(roleAndTeam?.team as team)
        userStore.setHasChosenRole(true)

        const userProperties = {
            userName: userStore.userName,
            role: userStore.role,
            team: userStore.team
        }
        try {
            await axios.post(`${BASE_URL}/signup`, userProperties, {
                headers: getHeaders()
            });
            localStorage.setItem('userName', userStore.userName)
    
        } catch (error) {
            console.error(error);
            return { response: false, data: null };
        }

        fillPartInSocketServer(part)
    }

    function fillPartInSocketServer( part: Part){
        const updatedParts = { ...parts };
        (updatedParts as Parts)[part] = true; 
        socket.emit("fillPart", updatedParts)
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

    return (
        <>
            {loading ? 
                (
                    <div>Loading...</div>
                ) :
                ( 
                    <>
                        <button 
                        disabled={parts?.blueCM || userStore.hasChosenRole} 
                        style={{ backgroundColor: '#386FA4', color: 'white' }}
                        type="button" 
                        className="btn btn-secondary card-button" 
                        onClick={() => {
                            choosePart('blueCM')
                        } }
                        >
                            Code Master
                        </button>
                        <button 
                        disabled={parts?.blueP || userStore.hasChosenRole} 
                        type="button" 
                        className="btn btn-secondary card-button" 
                        style={{ backgroundColor: '#386FA4', color: 'white' }}
                        onClick={() => {
                            choosePart('blueP')
                        } }
                        >
                            Player
                        </button>
                        <button 
                        disabled={parts?.redCM || userStore.hasChosenRole} 
                        type="button" 
                        className="btn btn-secondary card-button" 
                        style={{ backgroundColor: '#E94F37', color: 'white' }}
                        onClick={() => {
                            choosePart('redCM')
                        } }
                        >
                            Code Master
                        </button>
                        <button 
                        disabled={parts?.redP || userStore.hasChosenRole} 
                        type="button" 
                        className="btn btn-secondary card-button" 
                        style={{ backgroundColor: '#E94F37', color: 'white' }}
                        onClick={() => {
                            choosePart('redP')
                        } }
                        >
                            Player
                        </button>

                        <div>{playersOnline / 2} / 4 players are online... </div> { /* TODO: before production we need to change 
            {playerOnline / 2} to {playerOnline}. when a user connects the connection happens twice instead of once
            (as a result of the react strict mode). The effect of the strict mode ONLY happens in develpment so before 
            production we need to change it back */ }
                    </>    
                )
            }
        </>
    )
}

export default WaitingRoom


