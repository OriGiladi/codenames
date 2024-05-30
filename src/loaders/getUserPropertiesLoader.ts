import { BASE_URL } from "../utils/constants"
import rootStore from "../rootStore"
import { user } from "../utils/types"
const { userStore } = rootStore
const userID = sessionStorage.getItem('userID')
export const getUserProperties = async () => {
    if(userID){
        const res = await fetch(`${BASE_URL}/user/${userID}`)
        const data: user = await res.json()
        userStore.setRole(data.role)
        userStore.setTeam(data.team)
        userStore.setUserName(data.userName)
        return null
    }
    return null
}