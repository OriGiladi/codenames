import { useEffect, useState } from "react";
import { socketUser } from "../utils/types";
import { Socket } from "socket.io-client";
import { useNavigate } from 'react-router-dom';
import { getInitialGameProperties } from "../gameFunctionality/gameInitialization";

function WaitingRoom({socket}: {socket: Socket}) {
    const navigate = useNavigate();
    const [playersOnline, setPlayersOnline] = useState(0);
    useEffect(() => {
        socket.on('updatingUsersResponse', (players: socketUser []) => {
            setPlayersOnline(players.length)
        });
        socket.on('fullGroupResponse', (isGroupFull: boolean) => {
            if(isGroupFull){
                getInitialGameProperties(socket) 
                navigate('/board')
            }
        });  
    }, [socket])
    return (
        <>
            <div>{playersOnline} / 4 players are online... </div>
        </>
    )
}

export default WaitingRoom