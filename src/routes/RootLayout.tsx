import { Outlet } from "react-router-dom"
import { observer } from "mobx-react"
import NavBar from "./NavBar"
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