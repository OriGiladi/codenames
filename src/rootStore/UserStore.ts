import { RootStore } from "."
import { makeAutoObservable } from "mobx";
import { role, team } from "../utils/types";

class UserStore {
    rootstore : RootStore
    userName: string = "";
    chatRoom: string = ''
    role?: role
    team?: team
    hasChosenRole: boolean = false
    isOnline: boolean = false
    constructor(rootStore: RootStore) {
        this.rootstore = rootStore;
        makeAutoObservable(this);
    }
    setUserName(userName: string) {
        this.userName = userName
    }
    setChatRoom(chatRoom: string) {
        this.chatRoom = chatRoom
    }
    setRole(role: role) {
        this.role = role
    }
    setTeam(team: team) {
        this.team = team
    }
    setHasChosenRole(hasChosenRole: boolean) {
        this.hasChosenRole = hasChosenRole
    }
    setIsOnline(isOnline: boolean) {
        this.isOnline = isOnline
    }
    isHost() { // isHost was created in order to initiate the game only once instead of 4 time (will be from the blue team code master)
        return this.role === 'code-master' && this.team === 'blue'
    }
    disconnect() {
        this.userName = ''
        this.chatRoom = ''
        this.role = undefined
        this.team = undefined
        this.setHasChosenRole(false)
        localStorage.removeItem('userName')
    }

}
export default UserStore
