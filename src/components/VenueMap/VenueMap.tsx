/* global google */
import React from "react";
import burger from "../../assets/logos/burger.svg";
import "./VenueMap.scss";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  Circle,
  InfoWindow
} from "react-google-maps";
import { inject, observer } from "mobx-react";
import { VenueInfoDto } from "../../typings/VenueInfoDto";

export interface VenueMapProps {
  venues: VenueInfoDto[];
  zoom: number;
  center: { lat: number; lng: number };
  burgerStore?: any;
}

@inject("burgerStore")
@observer
class VenueMap extends React.PureComponent<VenueMapProps, {}> {
  calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
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

    return this.props.venues.map((place: VenueInfoDto) => {
      const BussStationDistance = this.calculateDistance(
        bussStation.lat,
        bussStation.lng,
        place.location.lat,
        place.location.lng
      );
      if (BussStationDistance > 1 && BussStationDistance < 10) {
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
      } else {
        return null;
      }
    });
  };

  render() {
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
            streetViewControl: false
          }}
        >
          <Circle
            defaultCenter={{
              lat: 58.37832,
              lng: 26.73246
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
