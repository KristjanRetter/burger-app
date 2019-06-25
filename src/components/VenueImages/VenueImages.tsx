import * as React from "react";
import "./VenueImages.scss";

export interface VenueImagesProps {
  images: any;
}

class VenueImages extends React.PureComponent<VenueImagesProps, {}> {
  render() {
    return (
      <section className="venue-images">
        <div className="container">
          {this.props.images.map((image: any) => {
            const url = `${image.prefix}500x500${image.suffix}`;
            return (
              <img className="venue-images__image" src={image.download_url} />
            );
          })}
        </div>
      </section>
    );
  }
}

export default VenueImages;
