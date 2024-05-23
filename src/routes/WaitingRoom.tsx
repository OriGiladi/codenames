import { useEffect, useState } from "react";
import { Part, Parts, role, socketUser, team } from "../utils/types";
import { Socket } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import { getInitialGameProperties } from "../gameFunctionality/gameInitialization";
import rootStore from "../rootStore";
const { userStore } = rootStore;

function WaitingRoom({socket}: {socket: Socket}) {
    const navigate = useNavigate();
    const [playersOnline, setPlayersOnline] = useState(0);
    const [parts, setParts] = useState<Parts | undefined>();
    const [loading, setLoading] = useState(true);
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

    function choosePart(part: Part){
        const roleAndTeam = getRoleAndTeamFromPart(part)
        userStore.setRole(roleAndTeam?.role as role)
        userStore.setTeam(roleAndTeam?.team as team)
        userStore.setHasChosenRole(true)
        fillPartInServer(part)
    }

    function fillPartInServer( part: Part){
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

                        <div>{playersOnline} / 4 players are online... </div>
                    </>    
                )
            }
        </>
    )
}

export default WaitingRoom


