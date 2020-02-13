import React, { Component } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text
} from "react-native";
import { ListItem } from "react-native-elements";

import { STATIC_BASE_URL } from "../constants/general";
import { moderateScale } from "../utility/UIScale";

export default class Home extends Component {
  componentDidMount() {
    this.reload();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.listStyle}
          data={this.props.employees.employees}
          renderItem={this.renderItem.bind(this)}
          refreshing={this.props.employees.loading}
          onRefresh={this.reload.bind(this)}
          keyExtractor={employee => employee._id}
        />
      </SafeAreaView>
    );
  }

  renderItem({ item }) {
    return (
      <ListItem
        leftAvatar={{
          source: { uri: STATIC_BASE_URL }
        }}
        title={item.name}
        subtitle={item.designation}
        bottomDivider
        chevron
        onPress={() => {
          this.props.navigation.navigate("EmployeeDetails");
        }}
      />
    );
  }

  reload() {
    this.props.employeesListAction().then(() => {
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
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  listStyle: {
    paddingVertical: moderateScale(10)
  }
});
