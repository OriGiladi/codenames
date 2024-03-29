import { RootStore } from "."
import { makeAutoObservable } from "mobx";

class UserStore {
    rootstore : RootStore
    userName: string = "";
    chatRoomId: number = 0
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
}
export default UserStore
