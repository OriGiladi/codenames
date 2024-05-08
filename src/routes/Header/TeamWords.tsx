import { team } from '../../utils/types'

const TeamWords = ({ team, TeamWords, civilianWords, assassinWord }: 
    {team: team, TeamWords: string [], civilianWords: string [], assassinWord: string []}) => {
    return (
        <div className="col-md-4 clues" style={{ backgroundColor: team }}>
            <p>
                Words:
                {TeamWords.map((word, index) => <span key={index}> {word} </span>)}
            </p>
            <p>
                Civilian Words:
                {civilianWords.map((word, index) => <span key={index}> {word} </span>)}
            </p>
            <p>
                Assassin:
                {assassinWord.map((word, index) => <span key={index}> {word} </span>)}
            </p>
        </div>
    );
};

export default TeamWords;
