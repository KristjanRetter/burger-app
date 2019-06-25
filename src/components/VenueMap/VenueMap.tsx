/* global google */
import React, { Fragment } from "react";
import burger from "../../assets/logos/burger.svg";
import "./VenueMap.scss";
import { observable, runInAction, action, toJS } from "mobx";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Circle,
  InfoWindow
} from "react-google-maps";
import { inject, observer } from "mobx-react";

export interface VenueMapProps {
  places: any;
  zoom: any;
  center: any;
  burgerStore?: any;
}

@inject("burgerStore")
@observer
class VenueMap extends React.PureComponent<VenueMapProps, {}> {
  componentDidMount() {
    this.props.burgerStore.getVenues();
    this.props.burgerStore.getVenueId("test");
  }

  calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Radius of the earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180; // deg2rad below
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      0.5 -
      Math.cos(dLat) / 2 +
      (Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        (1 - Math.cos(dLon))) /
        2;

    return R * 2 * Math.asin(Math.sqrt(a));
  };

  handleToggleOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  getVenues = () => {
    const bussStation = { lat: 58.37832, lng: 26.73246 };

    return this.props.places.map((place: any) => {
      const BussStationDistance = this.calculateDistance(
        bussStation.lat,
        bussStation.lng,
        place.location.lat,
        place.location.lng
      );
      if (BussStationDistance > 1) {
        return (
          <Marker
            key={place.id}
            icon={{ url: burger, scaledSize: new google.maps.Size(30, 30) }}
            position={{
              lat: place.location.lat,
              lng: place.location.lng
            }}
            onClick={() => {
              this.handleToggleOpen();
              this.props.burgerStore.getVenueId(place.id);
            }}
            options={{
              animation: 2
            }}
          >
            {this.props.burgerStore.venueID === place.id && (
              <InfoWindow>
                <h1>{place.name}</h1>
              </InfoWindow>
            )}
          </Marker>
        );
      }
    });
  };

  render() {
    const bussStation = { lat: 58.37832, lng: 26.73246 };

    return (
      <>
        <GoogleMap
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: 58.38012,
            lng: 26.72245
          }}
          options={{
            disableDefaultUI: true,
            streetViewControl: false,
            minZoom: 13
          }}
        >
          <Circle
            defaultCenter={{
              lat: bussStation.lat,
              lng: bussStation.lng
            }}
            radius={1000}
          />
          {this.getVenues()}
        </GoogleMap>
      </>
    );
  }
}

export default withScriptjs(withGoogleMap(VenueMap));
