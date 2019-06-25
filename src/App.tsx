import React from "react";
import "./App.scss";
import { Provider } from "mobx-react";
import { RootStore } from "./common/stores/rootStore";
import VenueImages from "./components/VenueImages/VenueImages";

const rootStore = new RootStore();

export interface AppProps {}

export interface AppState {
  venues: any;
  images: any;
}
var foursquare = require("react-foursquare")({
  clientID: "BFUGT4CB2RB2FATARCVQBYCD1VM0YHXNOY14L03SW21LMURD",
  clientSecret: "A31S0V2WI5YEYKNZRO5KY5ARCED4BIN4GKXZWEFM2DFIE5V1"
});

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      venues: [],
      images: []
    };
  }

  componentDidMount() {
    fetch("https://picsum.photos/v2/list?page=2&limit=3")
      .then(data => data.json())
      .then(data =>
        this.setState({
          images: data
        })
      );

    fetch(
      "https://api.foursquare.com/v2/venues/search/?categoryId=4bf58dd8d48988d16c941735&near=Tartu&client_id=BFUGT4CB2RB2FATARCVQBYCD1VM0YHXNOY14L03SW21LMURD&client_secret=4KQ23LZ1SKPWNSOS5EOGFBUUVPUNHDCXK2FKEOJJZ3OPQ3PU"
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          venues: data.response.venues
        });
      });
  }

  render() {
    return (
      <Provider {...rootStore}>
        <div className="burger-app">
          <header className="burger-app__header">
            <h1 className="burger-app__title">Venues</h1>
            <p className="burger-app__loader">Gathering data</p>
          </header>
          {/*   <Map
            center={{ lat: 58.38545402237506, lng: 26.359866734165085 }}
            zoom={13}
            places={this.state.venues}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCiqvVWt3WbgB72f4Nx30eL-2Ls0J9oxvM"
            loadingElement={<p />}
            containerElement={<div className="map__container" />}
            mapElement={<div className="map" />}
      />*/}
          <VenueImages images={this.state.images} />
        </div>
      </Provider>
    );
  }
}
