import rootStore from "../rootStore"
import { observer } from "mobx-react"
const  { userStore } = rootStore

const NavBar = observer(() => {
    return (
        <>
            <div>{userStore.userName}</div>
            <div>Role: {userStore.role}</div>
            <div>Team: {userStore.team}</div>
            <div>Room ID: {userStore.chatRoomId}</div>
        </>
        
    )
})

export default NavBar