import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import moment from "moment";

import { ALERT_TITLE_INVALID_INFORMATION } from "../constants/general";
import { moderateScale } from "../utility/UIScale";

export default class EmployeeAdd extends Component {
  state = {
    staffId: undefined,
    name: undefined,
    designation: undefined,
    startDate: null,
    email: undefined
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={90}
          contentContainerStyle={styles.scrollViewContent}
        >
          <Input
            label="Staff ID"
            placeholder="Staff ID"
            containerStyle={styles.inputContainerStyle}
            onChangeText={text => this.setState({ staffId: text })}
          />
          <Input
            label="Name"
            placeholder="Name"
            containerStyle={styles.inputContainerStyle}
            onChangeText={text => this.setState({ name: text })}
          />
          <Input
            label="Designation"
            placeholder="Designation"
            containerStyle={styles.inputContainerStyle}
            onChangeText={text => this.setState({ designation: text })}
          />
          <Input
            label="Join Date"
            placeholder="Join Date"
            containerStyle={styles.inputContainerStyle}
            inputComponent={() => (
              <DatePicker
                style={{ width: 200 }}
                date={this.state.startDate}
                mode="date"
                placeholder="Join Date"
                format="DD-MMM-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36,
                    borderWidth: 0
                  },
                  placeholderText: {
                    fontSize: moderateScale(18)
                  },
                  dateText: {
                    fontSize: moderateScale(18)
                  }
                }}
                onDateChange={date => this.setState({ startDate: date })}
              />
            )}
          />
          <Input
            label="Email"
            placeholder="Email"
            containerStyle={styles.inputContainerStyle}
            onChangeText={text => this.setState({ email: text })}
          />
          <Button
            title="Add Employee"
            containerStyle={styles.buttonContainerStyle}
            onPress={this._addButtonOnPress.bind(this)}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  _addButtonOnPress() {
    if (this.verifyForm()) {
      let params = {
        staffId: this.state.staffId,
        name: this.state.name,
        designation: this.state.designation,
        startDate: this.state.startDate
          ? moment(this.state.startDate, "DD-MMM-YYYY").format("YYYY-MM-DD")
          : undefined,
        email: this.state.email
      };

      this.props.employeeAddAction(params).then(() => {
        const { error } = this.props.employees;

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

        this.props.navigation.goBack();
      });
    }
  }

  verifyForm() {
    if (!this.state.staffId) {
      Alert.alert(
        ALERT_TITLE_INVALID_INFORMATION,
        "Please enter employee staff ID.",
        [
          {
            text: "OK"
          }
        ],
        {
          cancelable: false
        }
      );
      return false;
    }

    if (!this.state.name) {
      Alert.alert(
        ALERT_TITLE_INVALID_INFORMATION,
        "Please enter employee name.",
        [
          {
            text: "OK"
          }
        ],
        {
          cancelable: false
        }
      );
      return false;
    }

    if (!this.state.designation) {
      Alert.alert(
        ALERT_TITLE_INVALID_INFORMATION,
        "Please enter employee designation.",
        [
          {
            text: "OK"
          }
        ],
        {
          cancelable: false
        }
      );
      return false;
    }

    if (!this.state.startDate) {
      Alert.alert(
        ALERT_TITLE_INVALID_INFORMATION,
        "Please enter employee join date.",
        [
          {
            text: "OK"
          }
        ],
        {
          cancelable: false
        }
      );
      return false;
    }

    if (!this.state.email) {
      Alert.alert(
        ALERT_TITLE_INVALID_INFORMATION,
        "Please enter employee email.",
        [
          {
            text: "OK"
          }
        ],
        {
          cancelable: false
        }
      );
      return false;
    }

    return true;
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
