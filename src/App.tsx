import React from "react";

import "./App.css";
import VenueMap from "./components/VenueMap/VenueMap";
import { threadId } from "worker_threads";

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
      "https://api.foursquare.com/v2/venues/4f1be43de4b07beffe6f983a/photos/?client_id=BFUGT4CB2RB2FATARCVQBYCD1VM0YHXNOY14L03SW21LMURD&client_secret=AL2DICAO3E1BNPG22VHL5PBFUWWL4DWNOUXRSTISRL3UHYWK&v=20131124"
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);
        this.setState({
          prefix: data.response.photos.items[0].prefix,
          suffix: data.response.photos.items[0].suffix
        });
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
    console.log();
    // const pilt = this.state.books.response.photos.items[0].prefix;
    const url = `${this.state.prefix}300x500${this.state.suffix}`;
    return (
      <div className="App">
        <div style={{ height: "400px", width: "100%" }} className="map-wrapper">
          <VenueMap venues={this.state.venues} />
        </div>
        {this.handleVenues()}
      </div>
    );
  }
}

export default App;
//google api AIzaSyAECk90BXS-7Qrpb3vUJAs1tKW3gDSdlOE
