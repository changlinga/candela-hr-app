import React, { Component } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";

import Secure from "../utility/Secure";
import { moderateScale } from "../utility/UIScale";

export default class Login extends Component {
  state = {
    staffId: "",
    password: ""
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Input
            label="Staff ID"
            placeholder="Staff ID"
            containerStyle={styles.inputContainerStyle}
            onChangeText={staffId =>
              this.setState({
                staffId: staffId.trim()
              })
            }
          />
          <Input
            label="Password"
            placeholder="Password"
            containerStyle={styles.inputContainerStyle}
            secureTextEntry={true}
            onChangeText={password =>
              this.setState({
                password
              })
            }
          />
          <Button
            title="Login"
            containerStyle={styles.buttonContainerStyle}
            onPress={this._loginButtonOnPress.bind(this)}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  _loginButtonOnPress() {
    let encryptedStaffId = Secure.encrypt(
      this.props.publicKey.publicKey,
      this.state.staffId
    );
    let encryptedPassword = Secure.encrypt(
      this.props.publicKey.publicKey,
      this.state.password
    );

    this.props.loginAction(encryptedStaffId, encryptedPassword).then(() => {
      const { error } = this.props.user;

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

      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "Home" }]
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  scrollViewContent: {
    padding: moderateScale(15)
  },

  inputContainerStyle: {
    marginTop: moderateScale(25)
  },

  buttonContainerStyle: {
    marginTop: moderateScale(25)
  }
});
