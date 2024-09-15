import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { gameProperties, team } from "../utils/types";
const { gamePropertiesStore, userStore } = rootStore

export const flipCard = (clue: string, socket: Socket) => {
    const updatedGameProperties: gameProperties = { chatRoom: userStore.chatRoom}
    const gameArray = [...gamePropertiesStore.gameArray];
    let nextTurn: team | null = null
    let otherTeam: team;
    const guessesRemaining = (gamePropertiesStore.guessesRemaining as number) 
    const firstTeamRemainingWords = (gamePropertiesStore.firstTeamRemainingWords as number)
    const secondTeamRemainingWords = (gamePropertiesStore.secondTeamRemainingWords as number)
    gamePropertiesStore.turn === "red" ? (otherTeam = "blue") : (otherTeam = "red");

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (gameArray[i][j].word === clue) {
                if (gameArray[i][j].team === gamePropertiesStore.turn) {
                    gameArray[i][j].clicked = true;

                    if(gamePropertiesStore.turn === gamePropertiesStore.firstTeam){
                        updatedGameProperties.firstTeamRemainingWords = firstTeamRemainingWords - 1;
                        updatedGameProperties.guessesRemaining = guessesRemaining -1;
                    }
                    else{
                        updatedGameProperties.secondTeamRemainingWords = secondTeamRemainingWords - 1;
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
                        updatedGameProperties.secondTeamRemainingWords = secondTeamRemainingWords - 1;
                    }
                    else if(gamePropertiesStore.turn === gamePropertiesStore.secondTeam){
                        updatedGameProperties.firstTeamRemainingWords = firstTeamRemainingWords - 1 ;
                    }
                    // else{
                        gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
                        updatedGameProperties.allDisable = true;
                        updatedGameProperties.guessesRemaining = 0;
                    //}

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
                    if(gamePropertiesStore.turn === 'blue') {
                        updatedGameProperties.winner = 'red'
                    } 
                    else{
                        updatedGameProperties.winner = 'blue'
                    } 
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
        else if(gamePropertiesStore.civilianUnguessedWords?.includes(clue)){
            const indexOfTheWord = gamePropertiesStore.civilianUnguessedWords?.indexOf(clue) as number;
            if (indexOfTheWord !== -1) {
                const updatedUnguessedWords = [...(gamePropertiesStore.civilianUnguessedWords as string[])];
                updatedUnguessedWords.splice(indexOfTheWord, 1);
                updatedGameProperties.civilianUnguessedWords = updatedUnguessedWords
            }
        }
        updatedGameProperties.gameArray = gameArray
        if(updatedGameProperties.firstTeamRemainingWords === 0){ 
            updatedGameProperties.winner = gamePropertiesStore.firstTeam as 'red' | 'blue'
        }
        else if(updatedGameProperties.secondTeamRemainingWords === 0){
            updatedGameProperties.winner = gamePropertiesStore.secondTeam as 'red' | 'blue'
        }
        socket.emit("updateGameProperties", updatedGameProperties as gameProperties)
}