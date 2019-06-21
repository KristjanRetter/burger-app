/* global google */
import React, { Fragment } from "react";
import burger from "../../assets/logos/burger.svg";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Circle
} from "react-google-maps";

export interface VenueMapProps {
  places: any;
  zoom: any;
  center: any;
}

export interface VenueMapState {}

class VenueMap extends React.Component<VenueMapProps, VenueMapState> {
  state = { bussStation: { lat: 58.37832, lng: 26.73246 } };
  distance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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

  handleVenues = () => {
    return this.props.places.map((place: any) => {
      const BussStationDistance = this.distance(
        this.state.bussStation.lat,
        this.state.bussStation.lng,
        place.location.lat,
        place.location.lng
      );
      if (BussStationDistance > 1) {
        return (
          <Marker
            icon={{ url: burger, scaledSize: new google.maps.Size(30, 30) }}
            position={{
              lat: place.location.lat,
              lng: place.location.lng
            }}
          />
        );
      }
    });
  };

  render() {
    return (
      <GoogleMap
        defaultZoom={this.props.zoom}
        defaultCenter={{
          lat: 58.38012,
          lng: 26.72245
        }}
      >
        <Circle
          defaultCenter={{
            lat: this.state.bussStation.lat,
            lng: this.state.bussStation.lng
          }}
          radius={1000}
        />
        {this.handleVenues()}
      </GoogleMap>
    );
  }
}

export default withScriptjs(withGoogleMap(VenueMap));
