import { Outlet } from "react-router-dom"
import rootStore from "../rootStore"
import { observer } from "mobx-react"


const {  userStore } = rootStore
const RootLayout = observer(() => {
    return (
        <> 
            <div>{userStore.userName}</div>
            <div>Room ID: {userStore.chatRoomId}</div>
            <Outlet />
        </>
    )
})

export default RootLayout