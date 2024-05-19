import { Socket } from "socket.io-client";


export type role = "code-master" | "player"
export type team = "red" | "blue" | "assassin" | "civilian"
export type cardData = {
    word: string;
    team: team;
    clicked: boolean;
}
export type gamePropertiesObj = {
    gameArray?: cardData[][];
    firstTeamWords?: string[];
    firstTeamUnguessedWords?: string[];
    secondTeamWords?: string[];
    civilianWords?: string[];
    assassinWord?: string [];
    turn?: team;
    firstTeam?: team;
    secondTeam?: team;
    codeMasterView?: boolean;
    guessesRemaining?: number;
    allDisable?: boolean;
    firstTeamScore?: number;
    secondTeamScore?: number;
    firstTeamClues?: clueObj [];
    secondTeamClues?: clueObj [];
    secondTeamUnguessedWords?: string []
    gameOver?: boolean;
};
export type clueObj = {
    clue: string;
    num: number;
};
export type Message = {
    text: string;
    name: string;
    id: string;
    socketID: string;
    roomId: number
}
export type socketUser = {
    userName: string;
    socketID: string;
}
export interface SessionSocket extends Socket {
    userID? : string
    userName?: string
    sessionID?: string
}