import GamePropertiesStore from "./GamePropertiesStore";
import UserStore from "./UserStore";

export class RootStore {
    gamePropertiesStore: GamePropertiesStore;
    userStore: UserStore;
    constructor() {
        this.gamePropertiesStore = new GamePropertiesStore(this);
        this.userStore = new UserStore(this);
    }
    reset() {
        this.gamePropertiesStore = new GamePropertiesStore(this);
        this.userStore = new UserStore(this);
    }
}
const rootStore = new RootStore();
export default rootStore;