import rootStore from "../rootStore";
import { team } from "../routes/BoardGame";
const { gamePropertiesStore } = rootStore

export function passTurn() {
    let nextTurn: team | null = null;
    gamePropertiesStore.turn === "red" ? (nextTurn = "blue") : (nextTurn = "red");
    gamePropertiesStore.setAllDisable(true)
    gamePropertiesStore.setTurn(nextTurn)
    gamePropertiesStore.setGuessesRemaining(0)
}