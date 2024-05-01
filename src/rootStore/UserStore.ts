import { RootStore } from "."
import { makeAutoObservable } from "mobx";
import { role } from "../utils/types";



class UserStore {
    rootstore : RootStore
    userName: string = "";
    chatRoomId: number = 0
    role?: role
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
}
export default UserStore
