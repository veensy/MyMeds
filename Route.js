import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import AuthLoadingScreen from "./components/AuthLoadingScreen";
import Layout from "./components/Layout";
import Menu from "./components/Menu";
import CreateUser from "./components/Profile/CreateUser";
import MenuUser from "./components/Profile/MenuUser";
import ProfilList from "./components/Profile/ProfilList";
import Meds from "./components/Profile/Meds";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

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
  },
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
  },
  ProfilList: {
    screen: ProfilList,
    navigationOptions: ({ navigation }) => ({
      titre: null
    })
  },
  Meds: {
    screen: Meds,
    navigationOptions: ({ navigation }) => ({
      titre: null
    })
  }
});

// const AppStack = createStackNavigator({
//   CreateUser: {
//     screen: CreateUser,
//     navigationOptions: ({ navigation }) => ({
//       titre: null
//     })
//   },
//   MenuUser: {
//     screen: MenuUser,
//     navigationOptions: ({ navigation }) => ({
//       titre: null
//     })
//   }
// });

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthStack
  })
);
