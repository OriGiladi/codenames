import { useEffect, useState } from 'react'
import rootStore from "../rootStore"
import { observer } from "mobx-react"
import { Socket } from 'socket.io-client'
const {  userStore } = rootStore

const NavBar = observer(({socket}: {socket: Socket}) => {
    const [playerOnline, setPlayersOnline] = useState(0);
    useEffect(() => {
        socket.on('updatingUsersResponse', (data: any []) => {
            setPlayersOnline(data.length)
    });
    }, [socket])
    return (
        <>
            <div>{userStore.userName}</div>
            <div>{userStore.role}</div>
            <div>Room ID: {userStore.chatRoomId}</div>
            <div>online: {playerOnline}</div>
        </>
        
    )
})

export default NavBar