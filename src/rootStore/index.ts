import GamePropertiesStore from "./GamePropertiesStore";
export class RootStore {
    gamePropertiesStore: GamePropertiesStore;

    constructor() {
        this.gamePropertiesStore = new GamePropertiesStore(this);
    }
    reset() {
        this.gamePropertiesStore = new GamePropertiesStore(this);
    }
}
const rootStore = new RootStore();
export default rootStore;