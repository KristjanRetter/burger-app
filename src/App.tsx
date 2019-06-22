import React from "react";

import "./App.css";
import VenueMap from "./components/VenueMap/VenueMap";
import { threadId } from "worker_threads";
import Map from "./components/VenueMap/VenueMap";

declare interface Math {
  radians(): any;
}
export interface AppProps {}

export interface AppState {
  prefix: string;
  suffix: string;
  venues: any;
}
var foursquare = require("react-foursquare")({
  clientID: "BFUGT4CB2RB2FATARCVQBYCD1VM0YHXNOY14L03SW21LMURD",
  clientSecret: "A31S0V2WI5YEYKNZRO5KY5ARCED4BIN4GKXZWEFM2DFIE5V1"
});

var params = {
  near: "Tartu",
  categoryId: "4bf58dd8d48988d16c941735",
  radius: "2050"
};
var params1 = {
  VENUE_ID: "5aff05e888a48b00249194cf"
};
class App extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      prefix: "",
      suffix: "",
      venues: []
    };
  }

  componentDidMount() {
    fetch(
      "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Ossu%20Burger&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyCiqvVWt3WbgB72f4Nx30eL-2Ls0J9oxvM"
    ).then(data => console.log(data));

    fetch(
      "https://api.foursquare.com/v2/venues/search/?categoryId=4bf58dd8d48988d16c941735&near=Tartu&client_id=BFUGT4CB2RB2FATARCVQBYCD1VM0YHXNOY14L03SW21LMURD&client_secret=AL2DICAO3E1BNPG22VHL5PBFUWWL4DWNOUXRSTISRL3UHYWK&v=20131124"
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({
          venues: data.response.venues
        });
      });

    /*fetch(
      "https://api.foursquare.com/v2/venues/541ce992498e9ab3265ed894/photos/?limit=10&client_id=BFUGT4CB2RB2FATARCVQBYCD1VM0YHXNOY14L03SW21LMURD&client_secret=AL2DICAO3E1BNPG22VHL5PBFUWWL4DWNOUXRSTISRL3UHYWK&v=20131124"
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);

        if (
          data.response.photos.items[0].prefix !== undefined &&
          data.response.photos.items[0].suffix !== undefined
        ) {
          this.setState({
            prefix: data.response.photos.items[0].prefix,
            suffix: data.response.photos.items[0].suffix
          });
        }
      });*/
  }

  handleVenues = () => {
    {
      return this.state.venues.map((venue: any) => {
        return <div>{venue.name}</div>;
      });
    }
  };

  render() {
    // const pilt = this.state.books.response.photos.items[0].prefix;

    const url = `${this.state.prefix}300x500${this.state.suffix}`;
    return (
      <div className="App">
        <header>
          <h1>Venues</h1>
        </header>

        <section className="map-wrap">
          <Map
            center={{ lat: 58.38545402237506, lng: 26.359866734165085 }}
            zoom={13}
            places={this.state.venues}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCiqvVWt3WbgB72f4Nx30eL-2Ls0J9oxvM"
            loadingElement={<div style={{ width: "100%", height: `100%` }} />}
            containerElement={<div style={{ width: "100%", height: `100%` }} />}
            mapElement={
              <div
                style={{ borderRadius: "5px", width: "100%", height: `100%` }}
              />
            }
          />
          ,
        </section>
      </div>
    );
  }
}

export default App;
//google api AIzaSyAECk90BXS-7Qrpb3vUJAs1tKW3gDSdlOE
