import React, { Component } from "react";
import { ScrollView, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import moment from "moment";

import { STATIC_BASE_URL } from "../constants/general";
import { moderateScale } from "../utility/UIScale";
import employeesReducer from "../reducers/employeesReducer";

export default class EmployeeDetails extends Component {
  render() {
    const { employee } = this.props.route.params;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.topContainer}>
            <Avatar
              rounded
              size="xlarge"
              source={{
                uri: STATIC_BASE_URL
              }}
            />
            <Text style={styles.name}>{employee.name}</Text>
            <Text style={styles.caption}>{employee.designation}</Text>
          </View>
          <ListItem
            title="Staff ID"
            rightTitle={employee.staffId}
            bottomDivider
          />
          <ListItem
            title="Date of Birth"
            rightTitle={
              employee.birthDate
                ? moment(employee.birthDate).format("DD-MMM-YYYY")
                : ""
            }
            bottomDivider
          />
          <ListItem
            title="Gender"
            rightTitle={
              employee.gender === "m"
                ? "Male"
                : employee.gender === "f"
                ? "Female"
                : ""
            }
            bottomDivider
          />
          <ListItem
            title="Contact No"
            rightTitle={`${employee.contactNoCountryCode}${employee.contactNo}`}
            bottomDivider
          />
          <ListItem title="Email" rightTitle={employee.email} bottomDivider />
          <ListItem
            title="Join Date"
            rightTitle={
              employee.startDate
                ? moment(employee.startDate).format("DD-MMM-YYYY")
                : ""
            }
            bottomDivider
          />
          {employee.terminationDate && (
            <ListItem
              title="Termination Date"
              rightTitle={
                employee.terminationDate
                  ? moment(employee.terminationDate).format("DD-MMM-YYYY")
                  : ""
              }
              bottomDivider
            />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  contentContainerStyle: {
    paddingVertical: moderateScale(15)
  },

  topContainer: {
    paddingHorizontal: moderateScale(15),
    marginBottom: moderateScale(15),
    alignItems: "center"
  },

  name: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(25),
    fontWeight: "bold"
  },

  caption: {
    color: "grey",
    fontSize: moderateScale(15)
  }
});
