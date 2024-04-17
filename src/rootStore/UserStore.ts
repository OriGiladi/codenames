import { RootStore } from "."
import { makeAutoObservable } from "mobx";

export type role = "code-master" | "player"// TODO: move this type to a constants.ts file
export const userRoles = {
    CODE_MASTER: "code-master",
    PLAYER: "player"
} // TODO: move this type to a constants.ts file
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
