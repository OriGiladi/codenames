import { Socket } from "socket.io-client";
import FlipedCard from "./FlipedCard";
import UnflipedCard from "./UnflipedCard";
import { team } from "../../utils/types";


function Card({clue, team, clicked, flipCard, disable, socket}: 
    {clue: string, key: number, team: team, clicked: boolean, flipCard: (clue: string, socket: Socket) => void, disable: boolean, socket: Socket}) {
    return (
        <>
            {clicked ? 
                <FlipedCard clue={clue} socket={socket} cardStyle={team} flipCard={flipCard} /> : 
                <UnflipedCard clue={clue} socket={socket} disable={disable} flipCard={flipCard} /> 
            }
        </>
    )
}

export default Card

