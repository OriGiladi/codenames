import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { gameProperties, team } from "../utils/types";
const { gamePropertiesStore, userStore } = rootStore

const HandleZeroGuessesRemaining = (otherTeam: team, socket: Socket) => {
    alert("switching turn")
    socket.emit("updateGameProperties", {
        allDisable: true,
        turn: otherTeam,
        chatRoomID: userStore.chatRoomID
    } as gameProperties)
}
export const flipCard = (clue: string, socket: Socket) => {
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

                    gamePropertiesStore.turn === gamePropertiesStore.firstTeam ? 
                    socket.emit("updateGameProperties", {
                        firstTeamScore: firstTeamScore -1,
                        guessesRemaining: guessesRemaining -1,
                        chatRoomID: userStore.chatRoomID
                    } as gameProperties):
                    socket.emit("updateGameProperties", {
                        secondTeamScore: secondTeamScore -1,
                        guessesRemaining: guessesRemaining -1,
                        chatRoomID: userStore.chatRoomID
                    } as gameProperties)

                    gamePropertiesStore.turn === "red" ? (nextTurn = "red") : (nextTurn = "blue");
                    
                        
                    alert("correct")
                    if(guessesRemaining - 1 === 0){
                        HandleZeroGuessesRemaining(otherTeam, socket)
                    }
                } 
                else if (gameArray[i][j].team === otherTeam) {
                    gameArray[i][j].clicked = true;
                    gamePropertiesStore.turn === gamePropertiesStore.firstTeam ? 
                    socket.emit("updateGameProperties", {
                        secondTeamScore: secondTeamScore -1,
                        firstTeamScore: firstTeamScore -1,
                        guessesRemaining: 0,
                        chatRoomID: userStore.chatRoomID
                    } as gameProperties):

                    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
                    socket.emit("updateGameProperties", { 
                        allDisable: true, 
                        chatRoomID: userStore.chatRoomID 
                    } as gameProperties)

                    alert(`opponent's word, turn switched to ${nextTurn}`)
                    HandleZeroGuessesRemaining(otherTeam, socket)

                    break;
                } else if (gameArray[i][j].team === "civilian") {
                    gameArray[i][j].clicked = true;
                    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
                    
                    socket.emit("updateGameProperties", {
                        allDisable: true,
                        guessesRemaining: 0,
                        chatRoomID: userStore.chatRoomID
                    } as gameProperties)

                    alert(`civilian's word, turn switched to ${nextTurn}`)
                    HandleZeroGuessesRemaining(otherTeam, socket)
                    break;
                } else if (gameArray[i][j].team === "assassin") {
                    gameArray[i][j].clicked = true;
                    socket.emit("updateGameProperties", {
                        gameOver: true,
                        allDisable: true,
                        chatRoomID: userStore.chatRoomID
                    } as gameProperties)
                    break;
                }
            }
        }
        socket.emit("updateGameProperties", {
            gameArray: gameArray,
            chatRoomID: userStore.chatRoomID
        } as gameProperties)
        }
        if (gamePropertiesStore.firstTeamWords?.includes(clue)){
            const indexOfTheWord = gamePropertiesStore.firstTeamUnguessedWords?.indexOf(clue) as number;
            if (indexOfTheWord !== - 1) {
                const updatedUnguessedWords = [...(gamePropertiesStore.firstTeamUnguessedWords as string[])];
                updatedUnguessedWords.splice(indexOfTheWord, 1);
                socket.emit("updateGameProperties", { 
                    firstTeamUnguessedWords: updatedUnguessedWords,
                    chatRoomID: userStore.chatRoomID 
                });
            }
        } else if (gamePropertiesStore.secondTeamWords?.includes(clue)){
            const indexOfTheWord = gamePropertiesStore.secondTeamUnguessedWords?.indexOf(clue) as number;
            if (indexOfTheWord !== -1) {
                const updatedUnguessedWords = [...(gamePropertiesStore.secondTeamUnguessedWords as string[])];
                updatedUnguessedWords.splice(indexOfTheWord, 1);
                socket.emit("updateGameProperties", { 
                    secondTeamUnguessedWords: updatedUnguessedWords,
                    chatRoomID: userStore.chatRoomID
                });
            }
        }

}