/* global google */
import React, { Fragment } from "react";
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

export interface VenueMapProps {
  places: any;
  zoom: any;
  center: any;
}

export interface VenueMapState {}

class VenueMap extends React.Component<VenueMapProps, VenueMapState> {
  state = {
    bussStation: { lat: 58.37832, lng: 26.73246 },
    isOpen: true,
    venueId: null,
    prefix: "",
    suffix: "",
    images: []
  };
  componentWillMount() {
    this.setState({
      isOpen: true
    });
  }
  componentDidMount() {
    this.setState({
      isOpen: false
    });
  }
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

  handleToggleOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleToggleClose = () => {
    this.setState({
      isOpen: false
    });
  };

  getVenueImages = () => {
    fetch(
      `https://api.foursquare.com/v2/venues/${
        this.state.venueId
      }/photos/?limit=10&client_id=BFUGT4CB2RB2FATARCVQBYCD1VM0YHXNOY14L03SW21LMURD&client_secret=AL2DICAO3E1BNPG22VHL5PBFUWWL4DWNOUXRSTISRL3UHYWK&v=20131124`
    )
      .then(data => data.json())
      .then(data => {
        console.log(data);

        if (data.response.photos.items.length > 0) {
          this.setState({
            images: data.response.photos.items
          });
        }
      });
  };

  getVenues = () => {
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
            key={place.id}
            icon={{ url: burger, scaledSize: new google.maps.Size(30, 30) }}
            position={{
              lat: place.location.lat,
              lng: place.location.lng
            }}
            onClick={(e: any) => {
              this.handleToggleOpen();
              this.setState({
                venueId: place.id
              });
              console.log(this.state.venueId);
              this.getVenueImages();
            }}
            options={{
              animation: 2
            }}
          >
            {this.state.venueId === place.id && (
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
    return (
      <>
        {this.state.isOpen ? <p>loading</p> : null}
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
              lat: this.state.bussStation.lat,
              lng: this.state.bussStation.lng
            }}
            radius={1000}
          />
          {this.getVenues()}
        </GoogleMap>
        <br />
        <section className="burger-images">
          {this.state.images.map((image: any) => {
            const url = `${image.prefix}500x500${image.suffix}`;
            return <img className="burger-images__image" src={url} />;
          })}
        </section>
      </>
    );
  }
}

export default withScriptjs(withGoogleMap(VenueMap));
