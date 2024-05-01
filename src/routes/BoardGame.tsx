import { useState, useEffect } from 'react';
export type team = "red" | "blue" | "assassin" | "civilian"
import { observer } from 'mobx-react';
import { Socket } from 'socket.io-client';
import { boardLoader } from '../loaders/boardLoader';
import rootStore from '../rootStore';
import { addClue } from '../gameFunctionality/addClue';
import { flipCard } from '../gameFunctionality/flipCard';
import { passTurn } from '../gameFunctionality/passTurn';
import Header from './Header/Header';
import Card from './Card/Card';
import ClueForm from './ClueForm';
import Player from './Player';
import { gamePropertiesObj } from '../types/gamePropertiesObj';

const { gamePropertiesStore } = rootStore;

export type clueObj = {
    clue: string;
    num: number;
};

const BoardGame = observer(({ socket }: { socket: Socket }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.on('updateGamePropertiesResponse', (data) => {
            boardLoader(data);
            setLoading(false); // Data has been loaded, set loading to false
        });
    }, [socket]);

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : !gamePropertiesStore.gameOver ? (
                <div className="App">
                    <div>turn: {gamePropertiesStore.turn}</div>
                    <div>guesses remaining: {gamePropertiesStore.guessesRemaining}</div>
                    <Header
                        firstTeamWords={gamePropertiesStore.firstTeamWords as string[]}
                        firstTeam={gamePropertiesStore.firstTeam as team}
                        civilianWords={gamePropertiesStore.civilianWords as string[]}
                        assassinWord={gamePropertiesStore.assassinWord as string[]}
                        secondTeamWords={gamePropertiesStore.secondTeamWords as string[]}
                        secondTeam={gamePropertiesStore.secondTeam as team}
                        socket={socket}
                    />

                    <div className="game-container">
                        <ClueForm giveClue={addClue} socket={socket} />

                        <div className="row">
                            <Player
                                name={gamePropertiesStore.firstTeam as team}
                                score={gamePropertiesStore.firstTeamScore as number}
                                clues={gamePropertiesStore.firstTeamClues as clueObj[]}
                                passTurn={passTurn}
                                currentTurn={gamePropertiesStore.turn as team}
                                socket={socket}
                            />

                            <div className="col-md-10">
                                <div className="card-deck">
                                    {gamePropertiesStore.gameArray[0].map((wordObj) => (
                                        <Card
                                            clue={wordObj.word}
                                            key={Math.floor(Math.random() * 10000) + 1}
                                            team={wordObj.team}
                                            clicked={wordObj.clicked}
                                            flipCard={flipCard}
                                            disable={gamePropertiesStore.allDisabled as boolean}
                                            socket={socket}
                                        />
                                    ))}
                                </div>
                                <div className="card-deck">
                                    {gamePropertiesStore.gameArray[1].map((wordObj) => (
                                        <Card
                                            clue={wordObj.word}
                                            key={Math.floor(Math.random() * 10000) + 1}
                                            team={wordObj.team}
                                            clicked={wordObj.clicked}
                                            flipCard={flipCard}
                                            disable={gamePropertiesStore.allDisabled as boolean}
                                            socket={socket}
                                        />
                                    ))}
                                </div>
                                <div className="card-deck">
                                    {gamePropertiesStore.gameArray[2].map((wordObj) => (
                                        <Card
                                            clue={wordObj.word}
                                            key={Math.floor(Math.random() * 10000) + 1}
                                            team={wordObj.team}
                                            clicked={wordObj.clicked}
                                            flipCard={flipCard}
                                            disable={gamePropertiesStore.allDisabled as boolean}
                                            socket={socket}
                                        />
                                    ))}
                                </div>
                                <div className="card-deck">
                                    {gamePropertiesStore.gameArray[3].map((wordObj) => (
                                        <Card
                                            clue={wordObj.word}
                                            key={Math.floor(Math.random() * 10000) + 1}
                                            team={wordObj.team}
                                            clicked={wordObj.clicked}
                                            flipCard={flipCard}
                                            disable={gamePropertiesStore.allDisabled as boolean}
                                            socket={socket}
                                        />
                                    ))}
                                </div>
                                <div className="card-deck">
                                    {gamePropertiesStore.gameArray[4].map((wordObj) => (
                                        <Card
                                            clue={wordObj.word}
                                            key={Math.floor(Math.random() * 10000) + 1}
                                            team={wordObj.team}
                                            clicked={wordObj.clicked}
                                            flipCard={flipCard}
                                            disable={gamePropertiesStore.allDisabled as boolean}
                                            socket={socket}
                                        />
                                    ))}
                                </div>
                            </div>

                            <Player
                                name={gamePropertiesStore.secondTeam as team}
                                score={gamePropertiesStore.secondTeamScore as number}
                                clues={gamePropertiesStore.secondTeamClues as clueObj[]}
                                passTurn={passTurn}
                                currentTurn={gamePropertiesStore.turn as team}
                                socket={socket}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div>Game over</div>
            )}
        </>
    );
});

export default BoardGame;
