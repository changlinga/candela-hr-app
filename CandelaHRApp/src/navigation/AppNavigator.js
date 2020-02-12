import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

import Home from "../components/Home";
import EmployeeAdd from "../components/EmployeeAdd";
import { moderateScale } from "../utility/UIScale";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "Candela HR",
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
