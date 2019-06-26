import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "mobx-react";
import { RootStore } from "./common/stores/rootStore";

const rootStore = new RootStore();

ReactDOM.render(
  <Provider {...rootStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
