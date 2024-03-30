import { cardData } from "../gameFunctionality/gameInitialization";
import { clueObj, team } from "../routes/BoardGame";

export type gamePropertiesObj = {
    gameArray?: cardData[][];
    firstTeamWords?: string[];
    secondTeamWords?: string[];
    civilianWords?: string[];
    assassinWord?: string [];
    turn?: team;
    firstTeam?: team;
    secondTeam?: team;
    codeMasterView?: boolean;
    guessPhase?: boolean;
    guessesRemaining?: number;
    allDisable?: boolean;
    firstTeamScore?: number;
    secondTeamScore?: number;
    firstTeamClues?: clueObj [];
    secondTeamClues?: clueObj [];
    gameOver?: boolean;
};