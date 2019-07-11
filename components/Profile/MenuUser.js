import React from "react";
import { Container, Button, Text, Icon } from "native-base";
import { StackActions, NavigationActions } from "react-navigation";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import HeaderLayout from "../Header";

class MenuUser extends React.Component {
  handleLogout = () => {
    return this.props.screenProps.changeLoginState(false);
  };
  render() {
    // console.log(this.props.data);
    const { currentUser } = this.props.data;
    console.log(currentUser);
    
    return (
      <Container>
        <HeaderLayout
          leftSide={true}
          rightSide={true}
          routeNameUrl="Menu"
          navigation={this.props.navigation}
          title="Menu"
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
                    NavigationActions.navigate({ routeName: "CreateUser" })
                  ]
                })
              );
            }}
          >
            <Text>Add a user</Text>
            <Icon name="person-add" />
          </Button>

          <Button full onPress={this.handleLogout}>
            <Text>Log Out</Text>
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
