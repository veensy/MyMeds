import React from "react";
import { Container, Button, Text, Icon } from "native-base";
import { StackActions, NavigationActions } from "react-navigation";
import { AppLoading } from "expo";
import * as Font from "expo-font";

class Menu extends React.Component {
  state = {
    loading: true
  };
  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf")
      // Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf")
      // Ionicons: require("../node_modules/@expo/vector-icons/fonts/Ionicons.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <Container
        style={{
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button
          large
          style={{ alignSelf: "center", marginBottom: 10, width: 150 }}
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Signup" })]
              })
            );
          }}
        >
          <Text>Sign up</Text>
          <Icon name="create" />
        </Button>
        <Button
          large
          style={{ alignSelf: "center", width: 150 }}
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Signin" })]
              })
            );
          }}
        >
          <Text>Login</Text>
          <Icon name="log-in" />
        </Button>
      </Container>
    );
  }
}
export default Menu;
