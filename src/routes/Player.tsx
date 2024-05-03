import { observer } from "mobx-react";

import { Socket } from "socket.io-client";
import { clueObj, team } from "../utils/types";
const Player = observer(({ name, score, clues, passTurn, currentTurn, socket }: { 
    name: team, 
    score: number, 
    clues: clueObj[], 
    passTurn: (socket: Socket) => void, 
    currentTurn: team,
    socket: Socket
}) => {
    const isOff = name !== currentTurn;
    
    return (
        <div className="col-md-1">
            <p>{name.toUpperCase()} TEAM</p>
            <p>Remaining: {score}</p>
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
