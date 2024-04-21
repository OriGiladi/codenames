import { cardData } from "../gameFunctionality/gameInitialization"
import rootStore from "../rootStore"
import { clueObj, team } from "../routes/BoardGame"
import { gamePropertiesObj } from "../types/gamePropertiesObj"
const { gamePropertiesStore } = rootStore
export const boardLoader = (data: gamePropertiesObj) => {
    gamePropertiesStore.setGameArray(data.gameArray as cardData[][])
    gamePropertiesStore.setFirstTeamWords(data.firstTeamWords as string[])
    gamePropertiesStore.setSecondTeamWords(data.secondTeamWords as string[])
    gamePropertiesStore.setCivilianWords(data.civilianWords as string[])
    gamePropertiesStore.setAssassinWord(data.assassinWord as string[])
    gamePropertiesStore.setTurn(data.turn as team)
    gamePropertiesStore.setFirstTeam(data.firstTeam as team)
    gamePropertiesStore.setSecondTeam(data.secondTeam as team)
    gamePropertiesStore.setCodeMasterView(data.codeMasterView as boolean)
    gamePropertiesStore.setGuessPhase(data.guessPhase as boolean)
    gamePropertiesStore.setGuessesRemaining(data.guessesRemaining as number)
    gamePropertiesStore.setAllDisable(data.allDisable as boolean)
    gamePropertiesStore.setFirstTeamScore(data.firstTeamScore as number)
    gamePropertiesStore.setSecondTeamScore(data.secondTeamScore as number)
    gamePropertiesStore.setFirstTeamClues(data.firstTeamClues as clueObj[])
    gamePropertiesStore.setSecondTeamClues(data.secondTeamClues as clueObj[])
    gamePropertiesStore.setGameOver(data.gameOver as boolean)  
}