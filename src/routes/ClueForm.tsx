
import CodeMasterView from './Views/CodeMasterView';
import PlayerView from './Views/PlayerView';
import { ChangeEvent, FormEvent, useState } from 'react';
import { observer } from 'mobx-react';
import { Socket } from 'socket.io-client';
import { clueObj } from '../utils/types';
import rootStore from '../rootStore';
const { gamePropertiesStore, userStore } = rootStore;

const ClueForm = observer(({ giveClue, socket }: { giveClue: (clue: clueObj, socket: Socket) => void, socket: Socket }) => {
    const [clue, setClue] = useState('');
    const [clueNum, setClueNum] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!value.includes(" ")){
            setClue(e.target.value);
        }   
    };
    
    const handleChangeNum = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const remainingWords = gamePropertiesStore.turn === gamePropertiesStore.firstTeam ? gamePropertiesStore.firstTeamRemainingWords : gamePropertiesStore.secondTeamRemainingWords;
        if (!value.includes(" ") && !isNaN(Number(value)) && (Number(value) <= (remainingWords as number))){
            setClueNum(e.target.value);
        }
    };
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
            giveClue(
                {
                    clue: clue,
                    num: Number(clueNum),
                    
                },
                socket
            )
    };

    return (
        <>
            {gamePropertiesStore.codeMasterView &&  
            gamePropertiesStore.guessesRemaining === 0 &&
            gamePropertiesStore.turn === userStore.team &&
            gamePropertiesStore.winner === null ? 
            (
                <CodeMasterView 
                    clueValue={clue}
                    handleChange={handleChange} 
                    numValue={clueNum}
                    handleChangeNum={handleChangeNum} 
                    handleSubmit={handleSubmit}
                />
            ) 
            : 
            (
                <PlayerView />
            )}
        </>
    );
})

export default ClueForm;
