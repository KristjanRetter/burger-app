import React from "react";
import "./App.scss";
import { observer, inject } from "mobx-react";
import VenueImages from "./components/VenueImages/VenueImages";
import Map from "./components/VenueMap/VenueMap";
import { VenueInfoDto } from "./typings/VenueInfoDto";

const FOURSQUARE_API_KEY_SECRET =
  process.env.REACT_APP_FOURSQUARE_API_KEY_SECRET;
const FOURSQUARE_API_KEY_ID = process.env.REACT_APP_FOURSQUARE_API_KEY_ID;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export interface AppProps {
  burgerStore?: any;
}

export interface AppState {
  venues: VenueInfoDto[];
  images: [];
  width: number;
  loadingData: boolean;
}

@inject("burgerStore")
@observer
export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      loadingData: true,
      images: [],
      width: 0,
      venues: []
    };
  }

  componentDidMount() {
    window.addEventListener(
      "resize",
      (e: Event) => {
        e.preventDefault();
        this.resize.bind(this);
      },
      { passive: false }
    );
    this.resize();

    fetch(
      `https://api.foursquare.com/v2/venues/search/?categoryId=4bf58dd8d48988d16c941735&near=Tartu&client_id=${FOURSQUARE_API_KEY_ID}&client_secret=${FOURSQUARE_API_KEY_SECRET}&v=20190626`
    )
      .then(data => data.json())
      .then(data => {
        this.setState({
          venues: data.response.venues,
          loadingData: false
        });
      });
  }

  /*getVenues = () => {
    if (this.props.burgerStore.venueID) {
      fetch(
        `https://api.foursquare.com/v2/venues/${
          this.props.burgerStore.venueID
        }/photos?client_id=${FOURSQUARE_API_KEY_ID}&client_secret=${FOURSQUARE_API_KEY_SECRET}&v=20190626`
      )
        .then(data => data.json())
        .then(data =>
          this.setState({
          images: data.response.photos.items
        })
          
        );
    }
  };*/

  resize() {
    this.setState({ width: window.innerWidth });
  }

  handleZoom = () => {
    if (this.state.width <= 900) {
      return 12.5;
    } else {
      return 13;
    }
  };

  render() {
    /*this.getVenues();*/

    return (
      <div className="burger-app">
        <header className="burger-app__header">
          <h1 className="burger-app__title">Venues</h1>
          {this.state.loadingData && (
            <p className="burger-app__loader">Gathering data</p>
          )}
        </header>
        <Map
          center={{ lat: 58.38545402237506, lng: 26.359866734165085 }}
          zoom={this.handleZoom()}
          venues={this.state.venues}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`}
          loadingElement={<p />}
          containerElement={<div className="map__container" />}
          mapElement={<div className="map" />}
        />
        <VenueImages images={this.state.images} />
      </div>
    );
  }
}
