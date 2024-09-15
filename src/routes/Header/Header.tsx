import TeamWords from './TeamWords'
import rootStore from '../../rootStore'
import { observer } from 'mobx-react'
import { Socket } from 'socket.io-client'
import { team } from '../../utils/types'
const { gamePropertiesStore } = rootStore

const Header = observer(({ firstTeamWords, firstTeam, civilianWords, assassinWord, secondTeamWords, secondTeam}: 
    { firstTeamWords: string [], firstTeam: team, civilianWords: string[], assassinWord: string [], secondTeamWords: string [], secondTeam: team, socket: Socket}) => {

    return (
        <header className={`App-header clue-${gamePropertiesStore.codeMasterView  ?
        "shown" : "hide"}`}>
            <div className="row" id="header-row">
                {gamePropertiesStore.codeMasterView  ? ( 
                <TeamWords
                    TeamWords={firstTeamWords}
                    team={firstTeam}
                    civilianWords={civilianWords}
                    assassinWord={assassinWord}
                />
                ) : (
                    <div className="col-md-4 clues" />
                )}
                {gamePropertiesStore.codeMasterView  ? ( 
                <TeamWords
                    TeamWords={secondTeamWords}
                    team={secondTeam}
                    civilianWords={civilianWords}
                    assassinWord={assassinWord}
                />
                ) : (
                    <div className="col-md-4 clues" />
                )}
            </div>
        </header>
    )
})

export default Header