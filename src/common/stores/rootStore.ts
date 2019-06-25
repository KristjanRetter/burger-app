import BurgerStore from "../stores/burgerStore";
import { RouterStore } from "mobx-react-router";

export class RootStore {
  public burgerStore: BurgerStore;
  public routerStore: RouterStore;

  constructor() {
    this.routerStore = new RouterStore();
    this.burgerStore = new BurgerStore();
  }
}
