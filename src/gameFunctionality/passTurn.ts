import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { team } from "../routes/BoardGame";
import { gamePropertiesObj } from "../types/gamePropertiesObj";
const { gamePropertiesStore } = rootStore

export function passTurn(socket: Socket) {
    let nextTurn: team | null = null;
    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
    // gamePropertiesStore.setAllDisable(true)
    // gamePropertiesStore.setTurn(nextTurn)
    // gamePropertiesStore.setGuessesRemaining(0)
    const passTurnProperties: gamePropertiesObj = {
        allDisable: true,
        turn: nextTurn,
        guessesRemaining: 0
    }
    socket.emit("updateGameProperties", passTurnProperties)
}