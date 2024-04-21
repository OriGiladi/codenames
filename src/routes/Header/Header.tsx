import TeamWords from './TeamWords'
import { team } from '../BoardGame'
import rootStore from '../../rootStore'
import { observer } from 'mobx-react'
import { Image } from '@chakra-ui/react'
import { Socket } from 'socket.io-client'
const { gamePropertiesStore } = rootStore

const Header = observer(({ firstTeamWords, firstTeam, civilianWords, assassinWord, secondTeamWords, secondTeam, socket}: 
    { firstTeamWords: string [], firstTeam: team, civilianWords: string[], assassinWord: string [], secondTeamWords: string [], secondTeam: team, socket: Socket}) => {
    const showClues = () => {    
        socket.emit('showClues')
    }
    return (
        <header className={`App-header clue-${gamePropertiesStore.codeMasterView ? "shown" : "hide"}`}>
            <div className="row" id="header-row">
                {gamePropertiesStore.codeMasterView ? ( 
                <TeamWords
                    TeamWords={firstTeamWords}
                    team={firstTeam}
                    civilianWords={civilianWords}
                    assassinWord={assassinWord}
                />
                ) : (
                    <div className="col-md-4 clues" />
                )}

                <div className="col-md-4 ">
                    <Image src='../../../public/codenames.jpg' className="App-logo" alt="logo" 
                    onClick={() => showClues()} />
                    <h1 className="App-title">Welcome to Codenames</h1>
                </div>

                {gamePropertiesStore.codeMasterView ? (
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