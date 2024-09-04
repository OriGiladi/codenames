import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { gameProperties, team } from "../utils/types";
const { gamePropertiesStore, userStore } = rootStore

export const flipCard = (clue: string, socket: Socket) => {
    const updatedGameProperties: gameProperties = { chatRoomID: userStore.chatRoomID}
    const gameArray = [...gamePropertiesStore.gameArray];
    let nextTurn: team | null = null
    let otherTeam: team;
    const guessesRemaining = (gamePropertiesStore.guessesRemaining as number) 
    const firstTeamScore = (gamePropertiesStore.firstTeamScore as number)
    const secondTeamScore = (gamePropertiesStore.secondTeamScore as number)
    gamePropertiesStore.turn === "red" ? (otherTeam = "blue") : (otherTeam = "red");

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (gameArray[i][j].word === clue) {
                if (gameArray[i][j].team === gamePropertiesStore.turn) {
                    gameArray[i][j].clicked = true;

                    if(gamePropertiesStore.turn === gamePropertiesStore.firstTeam){
                        updatedGameProperties.firstTeamScore = firstTeamScore - 1;
                        updatedGameProperties.guessesRemaining = guessesRemaining -1;
                    }
                    else{
                        updatedGameProperties.secondTeamScore = secondTeamScore - 1;
                        updatedGameProperties.guessesRemaining = guessesRemaining -1;
                    }
                    gamePropertiesStore.turn === "red" ? (nextTurn = "red") : (nextTurn = "blue");
                        
                    alert("correct")
                    if(guessesRemaining - 1 === 0){
                        updatedGameProperties.allDisable = true;
                        updatedGameProperties.turn = otherTeam;
                        alert("switching turn")
                    }
                } 
                else if (gameArray[i][j].team === otherTeam) {
                    gameArray[i][j].clicked = true;
                    if(gamePropertiesStore.turn === gamePropertiesStore.firstTeam){
                        updatedGameProperties.firstTeamScore = firstTeamScore - 1 ;
                        updatedGameProperties.secondTeamScore = secondTeamScore - 1;
                        updatedGameProperties.guessesRemaining = 0;
                    }
                    else{
                        gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
                        updatedGameProperties.allDisable = true;
                    }

                    alert(`opponent's word, turn switched to ${nextTurn}`)
                    updatedGameProperties.allDisable = true;
                    updatedGameProperties.turn = otherTeam;

                    break;
                } else if (gameArray[i][j].team === "civilian") {
                    gameArray[i][j].clicked = true;
                    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");

                    updatedGameProperties.allDisable = true;
                    updatedGameProperties.guessesRemaining = 0;

                    alert(`civilian's word, turn switched to ${nextTurn}`)
                    updatedGameProperties.allDisable = true;
                    updatedGameProperties.turn = otherTeam;
                    break;
                } else if (gameArray[i][j].team === "assassin") {
                    gameArray[i][j].clicked = true;

                    updatedGameProperties.gameOver = true;
                    updatedGameProperties.allDisable = true;
                    break;
                }
            }
        }
        }
        if (gamePropertiesStore.firstTeamWords?.includes(clue)){
            const indexOfTheWord = gamePropertiesStore.firstTeamUnguessedWords?.indexOf(clue) as number;
            if (indexOfTheWord !== - 1) {
                const updatedUnguessedWords = [...(gamePropertiesStore.firstTeamUnguessedWords as string[])];
                updatedUnguessedWords.splice(indexOfTheWord, 1);
                updatedGameProperties.firstTeamUnguessedWords = updatedUnguessedWords
            }
        } else if (gamePropertiesStore.secondTeamWords?.includes(clue)){
            const indexOfTheWord = gamePropertiesStore.secondTeamUnguessedWords?.indexOf(clue) as number;
            if (indexOfTheWord !== -1) {
                const updatedUnguessedWords = [...(gamePropertiesStore.secondTeamUnguessedWords as string[])];
                updatedUnguessedWords.splice(indexOfTheWord, 1);
                updatedGameProperties.secondTeamUnguessedWords = updatedUnguessedWords
            }
        }
        socket.emit("updateGameProperties", updatedGameProperties as gameProperties)
}