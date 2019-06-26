import BurgerStore from "../stores/burgerStore";

export class RootStore {
  public burgerStore: BurgerStore;

  constructor() {
    this.burgerStore = new BurgerStore();
  }
}
