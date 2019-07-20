import { Button, Container, Icon, Text } from "native-base";
import React from "react";
import { NavigationActions, StackActions } from "react-navigation";

class Menu extends React.Component {
  render() {
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
