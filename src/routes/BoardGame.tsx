import Header from './Header/Header'
import '../App.css'
export type team = "red" | "blue" | "assassin" | "civilian"
import { observer } from 'mobx-react'
import Card from './Card/Card'
import { flipCard } from '../gameFunctionality/flipCard'
import { addClue } from '../gameFunctionality/addClue'
import ClueForm from './ClueForm'
import Player from './Player'
import rootStore from "../rootStore";
import { passTurn } from '../gameFunctionality/passTurn'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Socket } from 'socket.io-client'
const { gamePropertiesStore, userStore } = rootStore

export type clueObj = {
    clue: string,
    num: number
}
const BoardGame = observer(({ socket } : { socket: Socket }) => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [chatRoomID, setChatRoomID] = useState('');
    const InsertUserName = () => {
        socket.emit('newUser', { userName, socketID: socket.id });
        userStore.setUserName(userName)
        socket.emit("join_room", chatRoomID)
        userStore.setChatRoomId(Number(chatRoomID))
        navigate('/chat');
    }
    return (
        <>
            {!gamePropertiesStore.gameOver?
            (
                <div className="App">
                    <div>enter your name</div>
                    <input onChange={(e) => {setUserName(e.target.value)}}></input>
                    <div>enter your chatroom</div>
                    <input onChange={(e) => {setChatRoomID(e.target.value)}}></input>
                    <button onClick={() => {InsertUserName()}}>insert</button>
                    <div>turn: {gamePropertiesStore.turn}</div>
                    <div>guesses remaining: {gamePropertiesStore.guessesRemaining}</div>
                    <Header 
                    firstTeamWords={gamePropertiesStore.firstTeamWords as string []} 
                    firstTeam={gamePropertiesStore.firstTeam as team} 
                    civilianWords={gamePropertiesStore.civilianWords as string []} 
                    assassinWord={gamePropertiesStore.assassinWord as string []} 
                    secondTeamWords={gamePropertiesStore.secondTeamWords as string []} 
                    secondTeam={gamePropertiesStore.secondTeam as team} 
                    />
                    
                    <div className="game-container">
                        <ClueForm 
                        giveClue={addClue} 
                        />
                        
                        <div className="row">
                            <Player
                            name={gamePropertiesStore.firstTeam as team}
                            score={gamePropertiesStore.firstTeamScore as number}
                            clues={gamePropertiesStore.firstTeamClues as clueObj []}
                            passTurn={passTurn}
                            currentTurn={gamePropertiesStore.turn as team}
                            />

                        <div className="col-md-10">
                            <div className="card-deck">

                                {
                                gamePropertiesStore.gameArray[0].map((wordObj, index) => (
                                <Card
                                    clue={wordObj.word}
                                    key={Math.floor(Math.random() * 10000) + 1}
                                    team={wordObj.team}
                                    clicked={wordObj.clicked}
                                    flipCard={flipCard}
                                    disable={gamePropertiesStore.allDisabled as boolean}
                                />
                            ))}
                        </div>
                        <div className="card-deck">
                                {gamePropertiesStore.gameArray[1].map((wordObj, index) => (
                                <Card
                                    clue={wordObj.word}
                                    key={Math.floor(Math.random() * 10000) + 1}
                                    team={wordObj.team}
                                    clicked={wordObj.clicked}
                                    flipCard={flipCard}
                                    disable={gamePropertiesStore.allDisabled as boolean}
                                />
                                ))}
                        </div>
                        <div className="card-deck">
                                {gamePropertiesStore.gameArray[2].map((wordObj, index) => (
                                <Card
                                    clue={wordObj.word}
                                    key={Math.floor(Math.random() * 10000) + 1}
                                    team={wordObj.team}
                                    clicked={wordObj.clicked}
                                    flipCard={flipCard}
                                    disable={gamePropertiesStore.allDisabled as boolean}
                                />
                                ))}
                        </div>
                        <div className="card-deck">
                            {gamePropertiesStore.gameArray[3].map((wordObj, index) => (
                            <Card
                                clue={wordObj.word}
                                key={Math.floor(Math.random() * 10000) + 1}
                                team={wordObj.team}
                                clicked={wordObj.clicked}
                                flipCard={flipCard}
                                disable={gamePropertiesStore.allDisabled as boolean}
                            />
                            ))}
                        </div>
                        <div className="card-deck">
                            {gamePropertiesStore.gameArray[4].map((wordObj, index) => (
                            <Card
                                clue={wordObj.word}
                                key={Math.floor(Math.random() * 10000) + 1}
                                team={wordObj.team}
                                clicked={wordObj.clicked}
                                flipCard={flipCard}
                                disable={gamePropertiesStore.allDisabled as boolean}
                            />
                            ))}
                        </div>
                        </div>

                        <Player
                            name={gamePropertiesStore.secondTeam as team}
                            score={gamePropertiesStore.secondTeamScore as number}
                            clues={gamePropertiesStore.secondTeamClues as clueObj []}
                            passTurn={passTurn}
                            currentTurn={gamePropertiesStore.turn as team}
                        />
                    </div>
                </div>
            </div>
        ) 
        :
        (<div>Game over</div>)
            
    }
        </> 
    )
})

export default BoardGame