import React, { Component } from "react";
import { Alert } from "react-native";

export default class Launch extends Component {
  componentDidMount() {
    this.props.publicKeyGetAction().then(() => {
      const { error } = this.props.publicKey;

      if (error) {
        Alert.alert(
          error.title,
          error.message,
          [
            {
              text: "OK"
            }
          ],
          {
            cancelable: false
          }
        );
        return;
      }

      this.props.authenticateAction().then(userLoggedIn => {
        this.props.navigation.reset({
          index: 0,
          routes: [{ name: userLoggedIn ? "Home" : "Login" }]
        });
      });
    });
  }

  render() {
    return null;
  }
}
