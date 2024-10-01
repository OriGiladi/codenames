import { useState, useEffect } from 'react';
import './BoardGame.css';
import { observer } from 'mobx-react';
import { Socket } from 'socket.io-client';
import { boardLoader } from '../../loaders/boardLoader';
import rootStore from '../../rootStore';
import { addClue } from '../../gameFunctionality/addClue';
import { flipCard } from '../../gameFunctionality/flipCard';
import { passTurn } from '../../gameFunctionality/passTurn';
import Header from '../Header/Header';
import Card from '../Card/Card';
import ClueForm from '../ClueForm';
import Player from '../Player';
import { clueObj, team } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
// confetti
import Confetti from 'react-confetti';

const { gamePropertiesStore, userStore } = rootStore;

const BoardGame = observer(({ socket }: { socket: Socket }) => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    // TODO: try to nerrow down useEffects
    useEffect(() => { 
        socket.on('updateGamePropertiesResponse', (data) => {
            boardLoader(data);
            setLoading(false); // Data has been loaded, sets loading to false
        });
    }, [socket]);
    useEffect(() => { // when a user refreshes
        const sessionID = sessionStorage.getItem('sessionID');
        if (sessionID) {
            socket.auth = { sessionID };
            socket.connect();
            socket.on('connect', () => {
                socket.emit('newUser', { userName: userStore.userName || sessionStorage.getItem('userName'), socketID: socket.id}, userStore.chatRoom);
                socket.emit("updateGameProperties", 'none' ,sessionStorage.getItem('userName')) // just to get the game properties from the server
            });
        }
    }, []);

    return (
        <>
            {loading ? (
                <div>
                    <div>Loading...</div> 
                    <button onClick={()=> navigate('/')}> Back to home page</button>
                </div>

            ) :  (
                <div className="App winner">
                    {gamePropertiesStore.winner && (
                        <Confetti colors={[gamePropertiesStore.winner === 'red'?  '#cc0c0c':'#2789e5']} />
                    )}
                    <div className={gamePropertiesStore.winner === 'red' ? 
                    "red-winner" : gamePropertiesStore.winner === 'blue' ?
                    "blue-winner" : ''
                    }>

                        {gamePropertiesStore.winner === null ? '' : `The ${gamePropertiesStore.winner} won!`}
                    </div>
                    <div>turn: {gamePropertiesStore.turn}</div>
                    <div>guesses remaining: {gamePropertiesStore.guessesRemaining}</div>
                    <Header
                        firstTeamWords={gamePropertiesStore.firstTeamUnguessedWords as string[]}
                        firstTeam={gamePropertiesStore.firstTeam as team}
                        civilianWords={gamePropertiesStore.civilianUnguessedWords as string[]}
                        assassinWord={gamePropertiesStore.assassinWord as string[]}
                        secondTeamWords={gamePropertiesStore.secondTeamUnguessedWords as string[]}
                        secondTeam={gamePropertiesStore.secondTeam as team}
                        socket={socket}
                    />
                    <div className="game-container">
                        <ClueForm giveClue={addClue} socket={socket} />

                        <div className="row">
                            <Player
                                team={gamePropertiesStore.firstTeam as team}
                                remainingWords={gamePropertiesStore.firstTeamRemainingWords as number}
                                clues={gamePropertiesStore.firstTeamClues as clueObj[]}
                                passTurn={passTurn}
                                currentTurn={gamePropertiesStore.turn as team}
                                socket={socket}
                            />
                            <div className="col-md-10">
                                <div className="card-deck">
                                    {gamePropertiesStore.gameArray.flat().map((wordObj, index) => (
                                        <Card
                                            clue={wordObj.word}
                                            key={index}
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
                                team={gamePropertiesStore.secondTeam as team}
                                remainingWords={gamePropertiesStore.secondTeamRemainingWords as number}
                                clues={gamePropertiesStore.secondTeamClues as clueObj[]}
                                passTurn={passTurn}
                                currentTurn={gamePropertiesStore.turn as team}
                                socket={socket} 
                            />
                        </div>
                    </div>
                </div>
            ) 
        }
        </>
    );
});

export default BoardGame;