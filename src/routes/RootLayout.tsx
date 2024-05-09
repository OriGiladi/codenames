import { Outlet } from "react-router-dom"
import { observer } from "mobx-react"
import NavBar from "./NavBar"

const RootLayout = observer(() => {
    return (
        <> 
            <NavBar />
            <Outlet />
        </>
    )
})

export default RootLayout