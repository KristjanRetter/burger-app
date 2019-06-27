import * as React from "react";
import "./VenueImages.scss";
import { VenueImagesDto } from "../../typings/VenueImagesDto";
import { observer, inject } from "mobx-react";
import BurgerStore from "../../common/stores/burgerStore";

export interface VenueImagesProps {
  burgerStore?: BurgerStore;
}
@inject("burgerStore")
@observer
export default class VenueImages extends React.PureComponent<VenueImagesProps> {
  render() {
    return (
      <section className="venue-images">
        <div className="container">
          {this.props.burgerStore!.images.map((image: VenueImagesDto) => {
            const url = `${image.prefix}500x500${image.suffix}`;
            return (
              <img
                alt=""
                key={image.id}
                className="venue-images__image"
                src={url}
              />
            );
          })}
        </div>
      </section>
    );
  }
}
