import { Outlet } from "react-router-dom"
import { observer } from "mobx-react"
import NavBar from "./NavBar/NavBar"
import { SessionSocket } from "../utils/types"

const RootLayout = observer(({socket}: {socket: SessionSocket}) => {
    return (
        <> 
            <NavBar socket={socket} />
            <Outlet />
        </>
    )
})

export default RootLayout