import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

import Launch from "../containers/LaunchContainer";
import Login from "../containers/LoginContainer";
import Home from "../containers/HomeContainer";
import EmployeeAdd from "../components/EmployeeAdd";
import { moderateScale } from "../utility/UIScale";
import { logoutAction } from "../actions/userActions";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
          name="EmployeeAdd"
          component={EmployeeAdd}
          options={{ title: "Add Employee" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
