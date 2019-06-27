import React from "react";
import "./App.scss";
import VenueImages from "./components/VenueImages/VenueImages";
import Map from "./components/VenueMap/VenueMap";
import BurgerStore from "./common/stores/burgerStore";
import BurgerHeader from "./components/BurgerHeader/BurgerHeader";

const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export interface AppProps {
  burgerStore?: BurgerStore;
}

export interface AppState {
  width: number;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      width: 0
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize.bind(this));
    this.handleResize();
  }

  handleResize() {
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
    return (
      <div className="burger-app">
        <BurgerHeader />
        <Map
          center={{ lat: 58.38545402237506, lng: 26.359866734165085 }}
          zoom={this.handleZoom()}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}`}
          loadingElement={<p />}
          containerElement={<div className="map__container" />}
          mapElement={<div className="map" />}
        />
        <VenueImages />
      </div>
    );
  }
}
