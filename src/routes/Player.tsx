import { observer } from "mobx-react";
import rootStore from "../rootStore";
import { Socket } from "socket.io-client";
import { clueObj, team } from "../utils/types";
import { userRoles } from "../utils/constants";
const { userStore, gamePropertiesStore } = rootStore
const Player = observer(({ team,  remainingWords, clues, passTurn, currentTurn, socket }: { 
    team: team, 
    remainingWords: number, 
    clues: clueObj[], 
    passTurn: (socket: Socket) => void, 
    currentTurn: team, 
    socket: Socket
}) => {
    const isOff = team !== currentTurn ||
    userStore.role !== userRoles.PLAYER ||
    gamePropertiesStore.turn !== userStore.team
    
    return (
        <div className="col-md-1">
            <p>{team.toUpperCase()} TEAM</p>
            <p>Remaining: {remainingWords}</p>
            {clues.map((clueObj, index) => (
                <p key={index}> {clueObj.clue} ({clueObj.num}) </p>
            ))}
            <button style={{backgroundColor:"#ec971f"}} disabled={isOff} 
            type="button" className="btn btn-warning" onClick={() => { passTurn(socket) }}>
                Pass
            </button>
        </div>
    );
});

export default Player;
