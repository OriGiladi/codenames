import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { team } from "../routes/BoardGame";
import { gamePropertiesObj } from "../types/gamePropertiesObj";
const { gamePropertiesStore } = rootStore
export const flipCard = (clue: string, socket: Socket) => {
    const gameArray = [...gamePropertiesStore.gameArray];
    let nextTurn: team | null = null
    let otherTeam;
    const guessesRemining = (gamePropertiesStore.guessesRemaining as number) 
    const firstTeamScore = (gamePropertiesStore.firstTeamScore as number)
    const secondTeamScore = (gamePropertiesStore.secondTeamScore as number)
    gamePropertiesStore.turn === "red" ? (otherTeam = "blue") : (otherTeam = "red");
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (gameArray[i][j].word === clue) {
                if (gameArray[i][j].team === gamePropertiesStore.turn) {
                    console.log("your team")
                    gameArray[i][j].clicked = true;

                    gamePropertiesStore.turn === gamePropertiesStore.firstTeam ? 
                    socket.emit("updateGameProperties", {firstTeamScore: firstTeamScore -1} as gamePropertiesObj):
                    socket.emit("updateGameProperties", {secondTeamScore: secondTeamScore -1} as gamePropertiesObj)

                    gamePropertiesStore.turn === "red" ? (nextTurn = "red") : (nextTurn = "blue");
                    socket.emit("updateGameProperties", {guessesRemaining: guessesRemining -1} as gamePropertiesObj);

                    alert("correct")
                } 
                else if (gameArray[i][j].team === otherTeam) {
                    console.log("other team")
                    gameArray[i][j].clicked = true;
                    gamePropertiesStore.turn === gamePropertiesStore.firstTeam ? 
                    socket.emit("updateGameProperties", {secondTeamScore: secondTeamScore -1} as gamePropertiesObj):
                    socket.emit("updateGameProperties", {firstTeamScore: firstTeamScore -1} as gamePropertiesObj)
                    socket.emit("updateGameProperties", {guessesRemaining: 0} as gamePropertiesObj)

                    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
                    socket.emit("updateGameProperties", {guessPhase: false} as gamePropertiesObj)
                    socket.emit("updateGameProperties", {allDisable: true} as gamePropertiesObj)

                    alert(`opponent's word, turn switched to ${nextTurn}`)
                    break;
                } else if (gameArray[i][j].team === "civilian") {
                    console.log("civilian")
                    gameArray[i][j].clicked = true;
                    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
                    
                    socket.emit("updateGameProperties", {guessPhase: false} as gamePropertiesObj)
                    socket.emit("updateGameProperties", {allDisable: true} as gamePropertiesObj)
                    socket.emit("updateGameProperties", {guessesRemaining: 0} as gamePropertiesObj)

                    alert(`civilian's word, turn switched to ${nextTurn}`)
                    break;
                } else if (gameArray[i][j].team === "assassin") {
                    gameArray[i][j].clicked = true;
                    socket.emit("updateGameProperties", {gameOver: true} as gamePropertiesObj)
                    socket.emit("updateGameProperties", {allDisable: true} as gamePropertiesObj)
                    break;
                }
            }
        }
        socket.emit("updateGameProperties", {gameArray: gameArray} as gamePropertiesObj)
        console.log("nextTurn:", nextTurn)
        }

        if (gamePropertiesStore.guessesRemaining === 1) { // TODO: shoul'd work for zero but for some reason working for onew fix it
            alert("out of guesses, switching turn")
            socket.emit("updateGameProperties", {guessPhase: false} as gamePropertiesObj)
            socket.emit("updateGameProperties", {allDisable: true} as gamePropertiesObj)
            socket.emit("updateGameProperties", {turn: otherTeam as team} as gamePropertiesObj)
        }
}