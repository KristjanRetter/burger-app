import * as React from "react";
import "./BurgerHeader.scss";
import { observer, inject } from "mobx-react";
import BurgerStore from "../../common/stores/burgerStore";

export interface BurgerHeaderProps {
  burgerStore?: BurgerStore;
}

@inject("burgerStore")
@observer
export default class BurgerHeader extends React.PureComponent<
  BurgerHeaderProps
> {
  render() {
    return (
      <header className="burger-app__header">
        <h1 className="burger-app__title">Venues</h1>
        {this.props.burgerStore!.isLoading && (
          <p className="burger-app__loader">Gathering data</p>
        )}
      </header>
    );
  }
}
