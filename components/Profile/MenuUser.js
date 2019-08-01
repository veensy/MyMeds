import gql from "graphql-tag";
import { Button, Container, Icon, Text } from "native-base";
import React from "react";
import { graphql } from "react-apollo";
import { NavigationActions, StackActions } from "react-navigation";
import HeaderLayout from "../Header";
import { addUser } from "../helpers/images";

class MenuUser extends React.Component {
  handleLogout = () => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "Layout"
          })
        ]
      })
    );
    return this.props.screenProps.changeLoginState(false);
  };
  render() {
    const { currentUser } = this.props.data;

    return (
      <Container>
        <HeaderLayout
          leftSide={false}
          rightSide={true}
          routeNameUrl="Menu"
          navigation={this.props.navigation}
          title="Menu"
          logout={this.handleLogout}
          // rightText="logout"
        />

        <Container
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Button
            large
            style={{ alignSelf: "center", marginBottom: 10, width: 180 }}
            onPress={() => {
              this.props.navigation.dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: "ProfilList" })
                  ]
                })
              );
            }}
          >
            <Text>Profils</Text>
            <Icon name="list" />
          </Button>
          <Button
            large
            style={{ alignSelf: "center", width: 180 }}
            onPress={() => {
              this.props.navigation.dispatch(
                StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: "CreateProfil" })
                  ]
                })
              );
            }}
          >
            <Text>Add a profil</Text>
            <Icon name="person-add" />
          </Button>
        </Container>
      </Container>
    );
  }
}
export default graphql(
  gql`
    query User {
      currentUser {
        id
        email
      }
    }
  `
)(MenuUser);
