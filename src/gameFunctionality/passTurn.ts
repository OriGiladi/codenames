import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { gameProperties, team } from "../utils/types";
const { gamePropertiesStore, userStore } = rootStore

export function passTurn(socket: Socket) {
    let nextTurn: team | null = null;
    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
    const passTurnProperties: gameProperties = {
        allDisable: true,
        turn: nextTurn,
        guessesRemaining: 0,
        chatRoomID: userStore.chatRoomID
    }
    socket.emit("updateGameProperties", passTurnProperties)
}