import React, { Component } from "react";
import { Provider } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

import AppNavigator from "./src/navigation/AppNavigator";
import store from "./src/store/store";

export default class App extends Component {
  componentDidMount() {
    // Subscribe to network state updates
    this.unsubscribeNetworkStateUpdates = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }

  componentWillUnmount() {
    // Unsubscribe network state updates
    this.unsubscribeNetworkStateUpdates();
  }
}
