import React from "react";
import { View } from "react-native";
import { Header } from "react-native-elements";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

import Launch from "../containers/LaunchContainer";
import Login from "../containers/LoginContainer";
import Home from "../containers/HomeContainer";
import EmployeeDetails from "../components/EmployeeDetails";
import EmployeeAdd from "../components/EmployeeAdd";
import NetworkInfo from "../components/NetworkInfo";
import { moderateScale } from "../utility/UIScale";
import { logoutAction } from "../actions/userActions";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({ scene, previous, navigation }) => {
            const { options } = scene.descriptor;
            const title =
              options.headerTitle !== undefined
                ? options.headerTitle
                : options.title !== undefined
                ? options.title
                : scene.route.name;

            return (
              <View>
                <Header
                  leftComponent={
                    scene.route.name === "Login" ? null : (
                      <TouchableOpacity
                        onPress={() => {
                          if (previous) {
                            navigation.goBack();
                          } else {
                            logoutAction();
                            navigation.reset({
                              index: 0,
                              routes: [{ name: "Login" }]
                            });
                          }
                        }}
                      >
                        <Icon
                          name={previous ? "arrow-left" : "sign-out"}
                          type="font-awesome"
                          color="#fff"
                        />
                      </TouchableOpacity>
                    )
                  }
                  centerComponent={{
                    text: title,
                    style: { fontSize: moderateScale(20), color: "#fff" }
                  }}
                  rightComponent={
                    scene.route.name !== "Home" ? null : (
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("EmployeeAdd");
                        }}
                      >
                        <Icon name="plus" type="font-awesome" color="#fff" />
                      </TouchableOpacity>
                    )
                  }
                />
                <NetworkInfo />
              </View>
            );
          }
        }}
      >
        <Stack.Screen
          name="Launch"
          component={Launch}
          options={{ header: () => null }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "Candela HR",
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: moderateScale(10) }}
                onPress={() => {
                  logoutAction();
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "Login" }]
                  });
                }}
              >
                <Icon name="sign-out" type="font-awesome" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: moderateScale(10) }}
                onPress={() => {
                  navigation.navigate("EmployeeAdd");
                }}
              >
                <Icon name="add" />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name="EmployeeDetails"
          component={EmployeeDetails}
          options={({ route }) => ({ title: route.params.employee.name })}
        />
        <Stack.Screen
          name="EmployeeAdd"
          component={EmployeeAdd}
          options={{ title: "Add Employee" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
