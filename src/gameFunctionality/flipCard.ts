import rootStore from "../rootStore";
import { team } from "../routes/BoardGame";
const { gamePropertiesStore } = rootStore
export const flipCard = (clue: string) => {
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
                    gamePropertiesStore.setFirstTeamScore(firstTeamScore - 1) : 
                    gamePropertiesStore.setSecondTeamScore(secondTeamScore - 1);

                    gamePropertiesStore.turn === "red" ? (nextTurn = "red") : (nextTurn = "blue");
                    gamePropertiesStore.setGuessesRemaining(guessesRemining - 1);
                } 
                else if (gameArray[i][j].team === otherTeam) {
                    console.log("other team")
                    gameArray[i][j].clicked = true;
                    gamePropertiesStore.turn === gamePropertiesStore.firstTeam ? 
                    gamePropertiesStore.setSecondTeamScore(secondTeamScore - 1) : 
                    gamePropertiesStore.setFirstTeamScore(firstTeamScore - 1)
                    gamePropertiesStore.setGuessesRemaining(0);

                    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
                    gamePropertiesStore.setGuessPhase(false)
                    gamePropertiesStore.setAllDisable(true)
                    break;
                } else if (gameArray[i][j].team === "civilian") {
                    console.log("civilian")
                    gameArray[i][j].clicked = true;
                    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
                    gamePropertiesStore.setGuessPhase(false)
                    gamePropertiesStore.setAllDisable(true)
                    gamePropertiesStore.setGuessesRemaining(0);
                    break;
                } else if (gameArray[i][j].team === "assassin") {
                    gameArray[i][j].clicked = true;
                    gamePropertiesStore.setGameOver(true)
                    gamePropertiesStore.setAllDisable(true)
                    break;
                }
            }
        }
        gamePropertiesStore.setGameArray(gameArray)
        // gamePropertiesStore.setTurn(nextTurn as team)
        console.log("nextTurn:", nextTurn)
        }

        if (gamePropertiesStore.guessesRemaining === 0) {
            gamePropertiesStore.setGuessPhase(false)
            gamePropertiesStore.setAllDisable(true)
            gamePropertiesStore.setTurn(otherTeam as team)
        }
}