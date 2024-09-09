import { RootStore } from "."
import { makeAutoObservable } from "mobx";
import { cardData, clueObj, team } from "../utils/types";


class GamePropertiesStore {
    rootstore : RootStore
    allDisabled?: boolean
    assassinWord?: string []
    civilianWords?: string []
    codeMasterView?: boolean
    firstTeam?: team 
    firstTeamClues?: clueObj []
    firstTeamRemainingWords?: number
    firstTeamWords?: string []
    firstTeamUnguessedWords?: string []
    gameArray: cardData [] [] = []
    winner?: "red" | "blue" | null
    guessesRemaining?: number
    secondTeam?: team
    secondTeamClues?: clueObj []
    secondTeamRemainingWords?: number
    secondTeamWords?: string []
    secondTeamUnguessedWords?: string []
    turn?: team

    constructor(rootStore: RootStore) {
        this.rootstore = rootStore;
        makeAutoObservable(this);
    }
    setAllDisable(allDisabled: boolean) {
        this.allDisabled = allDisabled
    }
    setAssassinWord(assassinWord: string []) {
        this.assassinWord = assassinWord
    }
    setCivilianWords(civilianWords: string []) {
        this.civilianWords = civilianWords
    }
    setCodeMasterView(codeMasterView: boolean) {
        this.codeMasterView = codeMasterView
    }
    setFirstTeam(firstTeam: team) {
        this.firstTeam = firstTeam
    }
    setFirstTeamClues(firstTeamClues: clueObj []) {
        this.firstTeamClues = firstTeamClues
    }
    setFirstTeamRemainingWords(firstTeamRemainingWords: number) {
        this.firstTeamRemainingWords = firstTeamRemainingWords
    }
    setFirstTeamWords(firstTeamWords: string []) {
        this.firstTeamWords = firstTeamWords
    }
    setFirstTeamUnguessedWords(firstTeamUnguessedWords: string []) {
        this.firstTeamUnguessedWords = firstTeamUnguessedWords
    }
    setGameArray(gameArray: cardData [] []) {
        this.gameArray = gameArray
    }
    setWinner(winner: 'red' | 'blue' | null) {
        this.winner = winner
    }
    setGuessesRemaining(guessesRemaining: number) {
        this.guessesRemaining = guessesRemaining
    }
    setSecondTeam(secondTeam: team) {
        this.secondTeam = secondTeam
    }
    setSecondTeamClues(secondTeamClues: clueObj []) {
        this.secondTeamClues = secondTeamClues
    }
    setSecondTeamRemainingWords(secondTeamRemainingWords: number) {
        this.secondTeamRemainingWords = secondTeamRemainingWords
    }
    setSecondTeamWords(secondTeamWords: string []) {
        this.secondTeamWords = secondTeamWords
    }
    setSecondTeamUnguessedWords(secondTeamUnguessedWords: string []) {
        this.secondTeamUnguessedWords = secondTeamUnguessedWords
    }
    setTurn(turn: team) {
        this.turn = turn
    }
}
export default GamePropertiesStore
