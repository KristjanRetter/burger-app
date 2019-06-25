import { observable, action } from "mobx";

export default class BurgerStore {
  @observable
  public venueID: string = "";

  @action
  public getVenueId(id: string) {
    this.venueID = id;
  }
}
