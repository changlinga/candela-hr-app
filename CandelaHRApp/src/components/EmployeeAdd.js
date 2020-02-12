import React, { Component } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Input } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import moment from "moment";

import { moderateScale } from "../utility/UIScale";

export default class EmployeeAdd extends Component {
  state = {
    staffId: "",
    name: "",
    designation: "",
    startDate: null,
    endDate: null
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Input
            label="Staff ID"
            placeholder="Staff ID"
            containerStyle={styles.inputContainerStyle}
          />
          <Input
            label="Name"
            placeholder="Name"
            containerStyle={styles.inputContainerStyle}
          />
          <Input
            label="Designation"
            placeholder="Designation"
            containerStyle={styles.inputContainerStyle}
          />
          <DatePicker
            style={{ width: 200 }}
            date={this.state.startDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate="2016-05-01"
            maxDate="2016-06-01"
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
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={date => {
              this.setState({ startDate: date });
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
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
  }
});
