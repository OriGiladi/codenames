import { useEffect, useState } from 'react'
import rootStore from "../rootStore"
import { observer } from "mobx-react"
import { Socket } from 'socket.io-client'
import { socketUser } from '../utils/types'
const {  userStore } = rootStore

const NavBar = observer(({socket}: {socket: Socket}) => {
    const [playerOnline, setPlayersOnline] = useState(0);
    useEffect(() => {
        socket.on('updatingUsersResponse', (players: socketUser []) => {
            setPlayersOnline(players.length)
    });
    }, [socket])
    return (
        <>
            <div>{userStore.userName}</div>
            <div>Role: {userStore.role}</div>
            <div>Team: {userStore.team}</div>
            <div>Room ID: {userStore.chatRoomId}</div>
            <div>online: {playerOnline}</div>
        </>
        
    )
})

export default NavBar