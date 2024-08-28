import { REST_API_BASE_URL } from "../utils/constants"
import rootStore from "../rootStore"
import { user } from "../utils/types"
const { userStore } = rootStore
const userName = sessionStorage.getItem('userName')
export const getUserProperties = async () => {
    if(userName){
        const res = await fetch(`${REST_API_BASE_URL}/user/userName/${userName}`)
        const data: user = await res.json()
        userStore.setRole(data.role)
        userStore.setTeam(data.team)
        userStore.setUserName(data.userName)
        return null
    }
    return null
}