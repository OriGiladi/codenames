import rootStore from "../rootStore"
import { userRoles } from "../utils/constants"
import { cardData, clueObj, gamePropertiesObj, team } from "../utils/types"
const { gamePropertiesStore, userStore } = rootStore
export const boardLoader = (data: gamePropertiesObj) => {
    gamePropertiesStore.setGameArray(data.gameArray as cardData[][])
    gamePropertiesStore.setFirstTeamWords(data.firstTeamWords as string[])
    gamePropertiesStore.setSecondTeamWords(data.secondTeamWords as string[])
    gamePropertiesStore.setFirstTeamUnguessedWords(data.firstTeamUnguessedWords as string[])
    gamePropertiesStore.setCivilianWords(data.civilianWords as string[])
    gamePropertiesStore.setAssassinWord(data.assassinWord as string[])
    gamePropertiesStore.setTurn(data.turn as team)
    gamePropertiesStore.setFirstTeam(data.firstTeam as team)
    gamePropertiesStore.setSecondTeam(data.secondTeam as team)
    gamePropertiesStore.setCodeMasterView(userStore.role === userRoles.CODE_MASTER ? true : false)
    gamePropertiesStore.setGuessesRemaining(data.guessesRemaining as number)
    if(userStore.role === userRoles.PLAYER && userStore.team === gamePropertiesStore.turn){
        gamePropertiesStore.setAllDisable(data.allDisable as boolean)
    }
    else{
        gamePropertiesStore.setAllDisable(true)
    }    
    gamePropertiesStore.setFirstTeamScore(data.firstTeamScore as number)
    gamePropertiesStore.setSecondTeamScore(data.secondTeamScore as number)
    gamePropertiesStore.setFirstTeamClues(data.firstTeamClues as clueObj[])
    gamePropertiesStore.setSecondTeamClues(data.secondTeamClues as clueObj[])
    gamePropertiesStore.setSecondTeamUnguessedWords(data.secondTeamUnguessedWords as string[])
    gamePropertiesStore.setGameOver(data.gameOver as boolean)  
    localStorage.setItem('isGameInitialized', 'true') // TODO: set it to false / remove it, after the game ends 
}