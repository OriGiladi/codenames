import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { gamePropertiesObj, clueObj } from "../utils/types";
const { gamePropertiesStore } = rootStore

export function addClue(clueObj: clueObj, socket: Socket) {
    if (gamePropertiesStore.turn === gamePropertiesStore.firstTeam) {
        const clues = [...gamePropertiesStore.firstTeamClues as clueObj []];
        clues.push(clueObj);
        const addClueProperties: gamePropertiesObj = {
            firstTeamClues: clues,
            codeMasterView: false,
            allDisable: false,
            guessesRemaining: clueObj.num
        }
        socket.emit("updateGameProperties", addClueProperties)
    } else {
        const clues = [...gamePropertiesStore.secondTeamClues as clueObj []];
        clues.push(clueObj);
        const addClueProperties: gamePropertiesObj = {
            secondTeamClues: clues,
            codeMasterView: false,
            allDisable: false,
            guessesRemaining: clueObj.num
        }
        socket.emit("updateGameProperties", addClueProperties)
    }
}