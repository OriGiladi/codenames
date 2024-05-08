import { Outlet } from "react-router-dom"
import { observer } from "mobx-react"
import { Socket } from "socket.io-client"
import NavBar from "./NavBar"

const RootLayout = observer(({socket}: {socket: Socket}) => {
    return (
        <> 
            <NavBar socket={socket} />
            <Outlet />
        </>
    )
})

export default RootLayout