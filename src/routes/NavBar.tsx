import rootStore from "../rootStore"
import { observer } from "mobx-react"
import { SessionSocket } from "../utils/types";
import { useEffect, useState } from "react";
const  { userStore } = rootStore

const NavBar = observer(({socket}: {socket: SessionSocket}) => {
    const [playersOnline, setPlayersOnline] = useState(0);
    useEffect(() => {
        socket.on('updatingUsersOnlineResponse', (players: number) => {
            setPlayersOnline(players)
    });
    }, [socket])
    return (
        <>
            <div> {userStore.userName} </div>
            <div> Role: {userStore.role} </div>
            <div> Team: {userStore.team} </div>
            <div> Room ID: {userStore.chatRoomId} </div>
            <div> online: {Math.round(playersOnline)} </div>  { /* TODO: before production we need to change 
            {playerOnline / 2} to {playerOnline}. when a user connects the connection happens twice instead of once
            (as a result of the react strict mode). The effect of the strict mode ONLY happens in develpment so before 
            production we need to change it back */ }
        </>
        
    )
})

export default NavBar