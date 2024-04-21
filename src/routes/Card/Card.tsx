import { Socket } from "socket.io-client";
import { team } from "../BoardGame";
import FlipedCard from "./FlipedCard";
import UnflipedCard from "./UnflipedCard";


function Card({clue, key, team, clicked, flipCard, disable, socket}: 
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

    const redText = {
        color: "#7f0000"
    };

    const blueText = {
        color: "#ADD8E6"
    };

    const civilianText = {
        color: "#000000"
    };

    const assassinText = {
        color: "#ffffff"
    };

    let cardStyle;
    let textStyle;

    switch (team) {
        case "red":
        cardStyle = redTeamStyle;
        textStyle = redText;
        break;

        case "blue":
        cardStyle = blueTeamStyle;
        textStyle = blueText;
        break;

        case "civilian":
        cardStyle = civilianTeamStyle;
        textStyle = civilianText;
        break;

        case "assassin":
        cardStyle = assassinTeamStyle;
        textStyle = assassinText;
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

