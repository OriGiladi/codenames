import { Socket } from "socket.io-client";
import rootStore from "../rootStore";
import { clueObj } from "../routes/BoardGame";
const { gamePropertiesStore } = rootStore

export function addClue(clueObj: clueObj) {
    if (gamePropertiesStore.turn === gamePropertiesStore.firstTeam) {
        const clues = [...gamePropertiesStore.firstTeamClues as clueObj []];
        clues.push(clueObj);
        gamePropertiesStore.setFirstTeamClues(clues)
        gamePropertiesStore.setGuessPhase(true)
        gamePropertiesStore.setCodeMasterView(false)
        gamePropertiesStore.setAllDisable(false)
        gamePropertiesStore.setGuessesRemaining(clueObj.num)
    } else {
        const clues = [...gamePropertiesStore.secondTeamClues as clueObj []];
        clues.push(clueObj);
        gamePropertiesStore.setSecondTeamClues(clues)
        gamePropertiesStore.setGuessPhase(true)
        gamePropertiesStore.setCodeMasterView(false)
        gamePropertiesStore.setAllDisable(false)
        gamePropertiesStore.setGuessesRemaining(clueObj.num)
    }
}