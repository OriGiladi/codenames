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
    firstTeamScore?: number
    firstTeamWords?: string []
    gameArray: cardData [] [] = []
    gameOver?: boolean
    guessesRemaining?: number
    secondTeam?: team
    secondTeamClues?: clueObj []
    secondTeamScore?: number
    secondTeamWords?: string []
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
    setFirstTeamScore(firstTeamScore: number) {
        this.firstTeamScore = firstTeamScore
    }
    setFirstTeamWords(firstTeamWords: string []) {
        this.firstTeamWords = firstTeamWords
    }
    setGameArray(gameArray: cardData [] []) {
        this.gameArray = gameArray
    }
    setGameOver(gameOver: boolean) {
        this.gameOver = gameOver
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
    setSecondTeamScore(secondTeamScore: number) {
        this.secondTeamScore = secondTeamScore
    }
    setSecondTeamWords(secondTeamWords: string []) {
        this.secondTeamWords = secondTeamWords
    }
    setTurn(turn: team) {
        this.turn = turn
    }
}
export default GamePropertiesStore
