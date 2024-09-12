import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { gameProperties, clueObj } from "../utils/types";
const { gamePropertiesStore, userStore } = rootStore

export function addClue(clueObj: clueObj, socket: Socket) {
    if (gamePropertiesStore.turn === gamePropertiesStore.firstTeam) {
        const clues = [...gamePropertiesStore.firstTeamClues as clueObj []];
        clues.push(clueObj);
        const addClueProperties: gameProperties = {
            firstTeamClues: clues,
            codeMasterView: false,
            allDisable: false,
            guessesRemaining: clueObj.num,
            chatRoom: userStore.chatRoom
        }
        socket.emit("updateGameProperties", addClueProperties)
    } else {
        const clues = [...gamePropertiesStore.secondTeamClues as clueObj []];
        clues.push(clueObj);
        const addClueProperties: gameProperties = {
            secondTeamClues: clues,
            codeMasterView: false,
            allDisable: false,
            guessesRemaining: clueObj.num,
            chatRoom: userStore.chatRoom
        }
        socket.emit("updateGameProperties", addClueProperties)
    }
}