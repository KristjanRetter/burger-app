import { observable, action } from "mobx";

interface BurgerStoreTypes {
  venueID: string;
  getVenueId(id: string): void;
}

export default class BurgerStore implements BurgerStoreTypes {
  @observable
  public venueID: string = "";

  @action
  public getVenueId(id: string) {
    this.venueID = id;
  }
}
