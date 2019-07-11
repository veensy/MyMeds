import { Platform } from "react-native";

import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Layout from "./components/Layout";
import Menu from "./components/Menu";
import CreateUser from "./components/Profile/CreateUser";
import MenuUser from "./components/Profile/MenuUser";
import AuthLoadingScreen from "./components/AuthLoadingScreen";

const AuthStack = createStackNavigator({
  Layout: {
    screen: Layout,
    navigationOptions: ({ navigation }) => ({
      titre: null
    })
  },
  Menu: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      navigation: { navigation },
      title: null
    })
  },

  Signin: {
    screen: Signin,
    navigationOptions: ({ navigation }) => ({
      title: null
    })
  },
  Signup: {
    screen: Signup,
    navigationOptions: ({ navigation }) => ({
      title: null
    })
  }
});

const AppStack = createStackNavigator({
  CreateUser: {
    screen: CreateUser,
    navigationOptions: ({ navigation }) => ({
      titre: null
    })
  },
  MenuUser: {
    screen: MenuUser,
    navigationOptions: ({ navigation }) => ({
      titre: null
    })
  }
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      // initialRouteName: "AuthLoading"
    }
  )
);
