import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions
} from "react-navigation"; // Version can be specified in package.json
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Menu from "./components/Menu"

const Auth = createStackNavigator(
  {
    Menu: {
      screen: Menu,
      navigationOptions: {
        title: null
      }
    },

    Signin: {
      screen: Signin,
      navigationOptions: {
        title: "Sign in"
      }
    },
    Signup: {
      screen: Signup,
      navigationOptions: {
        title: "Sign up"
      }
    }
  },
  {
    initialRouteName: "Menu"
  }
);

export default createAppContainer(Auth);
