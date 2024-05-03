import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { gamePropertiesObj, team } from "../utils/types";
const { gamePropertiesStore } = rootStore

const HandleZeroGuessesRemaining = (otherTeam: team, socket: Socket) => {
    alert("switching turn")
    socket.emit("updateGameProperties", {
        allDisable: true,
        turn: otherTeam
    } as gamePropertiesObj)
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
                        guessesRemaining: guessesRemaining -1
                    } as gamePropertiesObj):
                    socket.emit("updateGameProperties", {
                        secondTeamScore: secondTeamScore -1,
                        guessesRemaining: guessesRemaining -1
                    } as gamePropertiesObj)

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
                        guessesRemaining: 0
                    } as gamePropertiesObj):

                    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
                    socket.emit("updateGameProperties", {allDisable: true} as gamePropertiesObj)

                    alert(`opponent's word, turn switched to ${nextTurn}`)
                    HandleZeroGuessesRemaining(otherTeam, socket)

                    break;
                } else if (gameArray[i][j].team === "civilian") {
                    gameArray[i][j].clicked = true;
                    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
                    
                    socket.emit("updateGameProperties", {
                        allDisable: true,
                        guessesRemaining: 0
                    } as gamePropertiesObj)

                    alert(`civilian's word, turn switched to ${nextTurn}`)
                    HandleZeroGuessesRemaining(otherTeam, socket)
                    break;
                } else if (gameArray[i][j].team === "assassin") {
                    gameArray[i][j].clicked = true;
                    socket.emit("updateGameProperties", {
                        gameOver: true,
                        allDisable: true
                    } as gamePropertiesObj)
                    break;
                }
            }
        }
        socket.emit("updateGameProperties", {
            gameArray: gameArray
        } as gamePropertiesObj)
    }
}