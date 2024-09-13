import rootStore from "../rootStore"
import { observer } from "mobx-react"
import '../App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faCircle } from '@fortawesome/free-solid-svg-icons'; // Import specific icon

import { SessionSocket, user } from "../utils/types";
import { useEffect } from "react";
import { Avatar } from "@chakra-ui/react";
import { REST_API_MULTIAVATAR_URL } from "../utils/constants";
const  { userStore, onlineUsersStore } = rootStore

const NavBar = observer(({socket}: {socket: SessionSocket}) => {
    useEffect(() => {
        socket.on('updatingUsersResponse', (users: user []) => {
            onlineUsersStore.setOnlineUsers(users);
    }   );
    }, [socket])

    return (
        <>
            <div> {userStore.userName} </div>
            <div> Role: {userStore.role} </div>
            <div> Team: {userStore.team} </div>
            <div> Room ID: {userStore.chatRoom} </div>
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
            
        </>
        
    )
})

export default NavBar