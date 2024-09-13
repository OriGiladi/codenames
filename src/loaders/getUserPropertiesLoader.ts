import { REST_API_BASE_URL } from "../utils/constants"
import rootStore from "../rootStore"
import { role, team, user } from "../utils/types"
const { userStore } = rootStore
const userName = sessionStorage.getItem('userName')
export const getUserProperties = async () => {
    if(userName){
        const res = await fetch(`${REST_API_BASE_URL}/user/userName/${userName}`)
        const data: {user: user} = await res.json()
        userStore.setRole(data.user.role as role)
        userStore.setTeam(data.user.team as team)
        if(data.user.role && data.user.team){
            userStore.setHasChosenRole(true)
        }
        userStore.setUserName(data.user.userName as string)
        userStore.setChatRoom(data.user.chatRoom as string)
        return null
    }
    return null
}