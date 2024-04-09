import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { clueObj } from "../routes/BoardGame";
import { gamePropertiesObj } from "../types/gamePropertiesObj";
const { gamePropertiesStore } = rootStore

export function addClue(clueObj: clueObj, socket: Socket) {
    if (gamePropertiesStore.turn === gamePropertiesStore.firstTeam) {
        const clues = [...gamePropertiesStore.firstTeamClues as clueObj []];
        clues.push(clueObj);
        const addClueProperties: gamePropertiesObj = {
            firstTeamClues: clues,
            guessPhase: true,
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
            guessPhase: true,
            codeMasterView: false,
            allDisable: false,
            guessesRemaining: clueObj.num
        }
        socket.emit("updateGameProperties", addClueProperties)
    }
}