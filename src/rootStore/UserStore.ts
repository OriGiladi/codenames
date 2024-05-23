import { RootStore } from "."
import { makeAutoObservable } from "mobx";
import { role, team } from "../utils/types";

class UserStore {
    rootstore : RootStore
    userName: string = "";
    chatRoomId: number = 0
    role?: role
    team?: team
    hasChosenRole: boolean = false
    constructor(rootStore: RootStore) {
        this.rootstore = rootStore;
        makeAutoObservable(this);
    }
    setUserName(userName: string) {
        this.userName = userName
    }
    setChatRoomId(chatRoomId: number) {
        this.chatRoomId = chatRoomId
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

}
export default UserStore
