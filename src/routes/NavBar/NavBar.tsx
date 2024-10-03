import rootStore from "../../rootStore"
import { observer } from "mobx-react"
import { useNavigate } from 'react-router-dom';
import './NavBar.css'
import '../../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import { SessionSocket, user } from "../../utils/types";
import { useEffect } from "react";
import { Avatar } from "@chakra-ui/react";
import { REST_API_MULTIAVATAR_URL } from "../../utils/constants";
const  { userStore, onlineUsersStore, gamePropertiesStore } = rootStore

const NavBar = observer(({socket}: {socket: SessionSocket}) => {
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('updatingUsersResponse', (users: user []) => {
            onlineUsersStore.setOnlineUsers(users);
    }   );
    }, [socket])

    return (
        <>
            <header>
                <img id="logo" src="../public/navbar-img.png" alt="" />
                <div id="wrap-user-info">
                    <ul className="user-info">
                        {userStore.userName ?
                            (<li>{userStore.userName}</li>) : ('')
                        }
                        {userStore.role?
                            (<li>Role: {userStore.role}</li>) : ('')
                        }
                        {userStore.team ?
                            (<li>Team: {userStore.team}</li>) : ('')
                        }
                        {gamePropertiesStore.winner !== null &&
                        onlineUsersStore.onlineUsers?.length === 4 ?
                        (<li 
                        onClick={() => { 
                            navigate('/')
                            socket.disconnect() 
                            onlineUsersStore.setOnlineUsers([])
                            userStore.disconnect()
                        }}>
                        Start a new game
                        </li>
                        ) 
                        : 
                        ('')
                }
                    </ul>
                </div>
                <div id="players">
                    {onlineUsersStore.onlineUsers?.map((player) => (
                        <div key={player.userName} className="users-in-game">
                            <FontAwesomeIcon icon={faCircle} className={player.isOnline ? 'online-icon' : 'offline-icon'} /> 
                            <Avatar src={`${REST_API_MULTIAVATAR_URL}/${player.userName}.png`}
                            className={player.userName === userStore.userName ? 'me player' : 'player'}
                            color={player.userName === userStore.userName ? 'blue' : 'black'}>
                                {player.userName}
                            </Avatar>
                        </div>
                    ))}
                </div>
            </header>
            
        </>
        
    )
})

export default NavBar