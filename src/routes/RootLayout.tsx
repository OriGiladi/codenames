import { Outlet } from "react-router-dom"

function RootLayout() {
    return (
        <> 
            <div> NavBar here </div>
            <Outlet />
        </>
    )
}

export default RootLayout