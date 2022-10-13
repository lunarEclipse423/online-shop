import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import allReducers from "./reducers";

const store = createStore(allReducers);
store.subscribe(() => {
  console.log("state updated");
  console.log(store.getState());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
