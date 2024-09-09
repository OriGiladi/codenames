import { RootStore } from "."
import { makeAutoObservable } from "mobx";
import { user } from "../utils/types";

class OnlineUsersStore {
    rootstore : RootStore
    onlineUsers?: user []

    constructor(rootStore: RootStore) {
        this.rootstore = rootStore;
        makeAutoObservable(this);
    }
    setOnlineUsers(onlineUsers: user []){
        this.onlineUsers = onlineUsers
    }
}
export default OnlineUsersStore
