import { observable, action } from "mobx";
import { VenueImagesDto } from "../../typings/VenueImagesDto";
import { VenueInfoDto } from "../../typings/VenueInfoDto";

const FOURSQUARE_API_KEY_SECRET =
  process.env.REACT_APP_FOURSQUARE_API_KEY_SECRET;
const FOURSQUARE_API_KEY_ID = process.env.REACT_APP_FOURSQUARE_API_KEY_ID;

export default class BurgerStore {
  @observable
  public images: VenueImagesDto[] = [];

  @observable
  public venues: VenueInfoDto[] = [];

  @observable
  public venueID: string = "";

  @observable
  public isLoading: boolean = true;

  public getVenueInfo = () => {
    fetch(
      `https://api.foursquare.com/v2/venues/search/?categoryId=4bf58dd8d48988d16c941735&near=Tartu&client_id=${FOURSQUARE_API_KEY_ID}&client_secret=${FOURSQUARE_API_KEY_SECRET}&v=20190626`
    )
      .then(data => data.json())
      .then(data => {
        this.venues = data.response.venues;
        this.isLoading = false;
      });
  };

  
  public getVenueImages = () => {
    this.isLoading = true;
    if (this.venueID) {
      fetch(
        `https://api.foursquare.com/v2/venues/${
          this.venueID
        }/photos?client_id=${FOURSQUARE_API_KEY_ID}&client_secret=${FOURSQUARE_API_KEY_SECRET}&v=20190626`
      )
        .then(data => data.json())
        .then(data => {
          console.log(data);
          this.isLoading = false;
          try {
            this.images = data.response.photos.items;
          } catch (err) {
            alert(`Your burger ${data.meta.errorDetail}`);
          }
        });
    }
  };

  @action
  public getVenueId(id: string) {
    this.venueID = id;
  }
}
