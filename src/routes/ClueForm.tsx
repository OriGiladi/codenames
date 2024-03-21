import { clueObj } from './BoardGame';
import rootStore from '../rootStore';
import CodeMasterView from './Views/CodeMasterView';
import PlayerView from './Views/PlayerView';
import { ChangeEvent, FormEvent, useState } from 'react';
import { observer } from 'mobx-react';

const { gamePropertiesStore } = rootStore;

const ClueForm = observer(({ giveClue }: { giveClue: (clue: clueObj) => void }) => {
    const [clue, setClue] = useState('');
    const [clueNum, setClueNum] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setClue(e.target.value);
    };
    
    const handleChangeNum = (e: ChangeEvent<HTMLInputElement>) => {
        setClueNum(e.target.value);
    };
    
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        giveClue({
            clue: clue,
            num: Number(clueNum)
        });
    };

    return (
        <>
            {gamePropertiesStore.codeMasterView && gamePropertiesStore.guessesRemaining === 0 ? 
            (
                <CodeMasterView 
                    handleChange={handleChange} 
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
