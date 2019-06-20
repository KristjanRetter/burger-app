import React, { Component } from "react";
import burger from "../../assets/logos/burger.svg";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import "./VenueMap.scss";

export interface VenueMapProps {
  google: any;
  venues: any;
}

export interface VenueMapState {}

class VenueMap extends React.Component<VenueMapProps, VenueMapState> {
  state = {
    lat: 58.38275705619358,
    lng: 26.74649799484187,
    zoom: 14,
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };
  componentDidMount() {
    return;
  }
  handleClick = () => {
    return this.setState({
      lat: this.props.venues[3].location.lat,
      lng: this.props.venues[3].location.lng,
      zoom: 14
    });
  };

  onMarkerClick = (props: any, marker: any, e: any) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  render() {
    console.log(this.state.lat);
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={this.state.zoom}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
        >
          <Marker
            icon={burger}
            onClick={this.onMarkerClick}
            title={"Changing Colors Garage"}
            position={{ lat: this.state.lat, lng: this.state.lng }}
          />
        </Map>
        <button onClick={this.handleClick}>Change</button>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAECk90BXS-7Qrpb3vUJAs1tKW3gDSdlOE"
})(VenueMap);
