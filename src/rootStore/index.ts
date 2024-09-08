import GamePropertiesStore from "./GamePropertiesStore";
import OnlineUsersStore from "./onlineUsersStore";
import UserStore from "./UserStore";

export class RootStore {
    gamePropertiesStore: GamePropertiesStore;
    userStore: UserStore;
    onlineUsersStore: OnlineUsersStore
    constructor() {
        this.gamePropertiesStore = new GamePropertiesStore(this);
        this.userStore = new UserStore(this);
        this.onlineUsersStore = new OnlineUsersStore(this)
    }
    reset() {
        this.gamePropertiesStore = new GamePropertiesStore(this);
        this.userStore = new UserStore(this);
    }
}
const rootStore = new RootStore();
export default rootStore;