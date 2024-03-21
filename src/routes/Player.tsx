import { observer } from "mobx-react";
import { clueObj, team } from "./BoardGame";
const Player = observer(({ name, score, clues, passTurn, currentTurn }: { 
    name: team, 
    score: number, 
    clues: clueObj[], 
    passTurn: () => void, 
    currentTurn: team 
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
            type="button" className="btn btn-warning" onClick={passTurn}>
                Pass
            </button>
        </div>
    );
});

export default Player;
