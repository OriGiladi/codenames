import { wordBank } from "../wordBark";
import { Socket } from "socket.io-client";
import { cardData, gamePropertiesObj, team } from "../utils/types";

function shuffle(wordBank: string [] | cardData []) {
    let currentIndex = wordBank.length,
    temporaryValue,
    randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = wordBank[currentIndex];
        wordBank[currentIndex] = wordBank[randomIndex];
        wordBank[randomIndex] = temporaryValue;
    }

    return wordBank;
}

export function getInitialGameProperties(socket: Socket){
    let startTurn: team;
    let secondTurn: team;
    Math.round(Math.random()) > 0 ? (startTurn = "blue") : (startTurn = "red");
    startTurn === "blue" ? (secondTurn = "red") : (secondTurn = "blue");

    const shuffledBank = shuffle(wordBank) as string [];

    const arrayofWordObjects: cardData [] = [];
    const firstTeamWords = [];
    const secondTeamWords = [];
    const civilianWords = [];
    const assassinWord = [];

    for (let i = 0; i < 9; i++) {
        const cardData: cardData = {
            word: shuffledBank[i],
            team: startTurn,
            clicked: false
        };
        arrayofWordObjects.push(cardData);
        firstTeamWords.push(cardData.word);
    }

    for (let j = 10; j < 18; j++) {
        const cardData = {
            word: shuffledBank[j],
            team: secondTurn,
            clicked: false
        };
        arrayofWordObjects.push(cardData);
        secondTeamWords.push(cardData.word);
    }

    for (let k = 20; k < 27; k++) {
        const cardData: cardData = {
            word: shuffledBank[k],
            team: "civilian",
            clicked: false
        };
        civilianWords.push(cardData.word);
        arrayofWordObjects.push(cardData);
    }

    for (let l = 30; l < 31; l++) {
        const cardData: cardData = {
            word: shuffledBank[l],
            team: "assassin",
            clicked: false
        };

        assassinWord.push(cardData.word);
        arrayofWordObjects.push(cardData);
    }

    shuffle(arrayofWordObjects);

    const gameArray: cardData [] [] = [];

    for (let a = 0; a < 5; a++) {
        const row = arrayofWordObjects.splice(0, 5);
        gameArray.push(row)
    }
    const gameStartProperties: gamePropertiesObj = { 
        gameArray: gameArray,
        firstTeamWords: firstTeamWords,
        firstTeamUnguessedWords: firstTeamWords,
        secondTeamWords: secondTeamWords,
        civilianWords: civilianWords,
        assassinWord: assassinWord,
        turn: startTurn,
        firstTeam: startTurn,
        secondTeam: secondTurn,
        codeMasterView: false,
        guessesRemaining: 0,
        allDisable: true,
        firstTeamScore: 9,
        secondTeamScore: 8,
        firstTeamClues: [],
        secondTeamClues: [],
        secondTeamUnguessedWords: secondTeamWords,
        gameOver: false
    }
    socket.emit('gameStart', gameStartProperties);
    return null // makes it able to be used as a loader
}