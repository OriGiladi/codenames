import { Socket } from "socket.io-client";
import FlipedCard from "./FlipedCard";
import UnflipedCard from "./UnflipedCard";
import { team } from "../../utils/types";

function Card({clue, team, clicked, flipCard, disable, socket}: 
    {clue: string, key: number, team: team, clicked: boolean, flipCard: (clue: string, socket: Socket) => void, disable: boolean, socket: Socket}) {
    const blueTeamStyle = {
        backgroundColor: "#386FA4"
    };

    const redTeamStyle = {
        backgroundColor: "#E94F37"
    };

    const civilianTeamStyle = {
        backgroundColor: "#808080"
    };

    const assassinTeamStyle = {
        backgroundColor: "#000000"
    };

    let cardStyle;

    switch (team) {
        case "red":
        cardStyle = redTeamStyle;
        break;

        case "blue":
        cardStyle = blueTeamStyle;
        break;

        case "civilian":
        cardStyle = civilianTeamStyle;
        break;

        case "assassin":
        cardStyle = assassinTeamStyle;
        break;
    }
    return (
        <>
            {clicked ? 
                <FlipedCard clue={clue} socket={socket} cardStyle={cardStyle} flipCard={flipCard} /> : 
                <UnflipedCard clue={clue} socket={socket} disable={disable} flipCard={flipCard} /> 
            }
        </>
    )
}

export default Card

