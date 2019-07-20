import {
  Body,
  Button,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title
} from "native-base";
import React, { Component } from "react";
import { NavigationActions, StackActions } from "react-navigation";
import { signOut } from "../util";

class HeaderLayout extends Component {
  render() {
    return (
      <Header>
        <Left>
          {this.props.leftSide && (
            <Button
              transparent
              onPress={() => {
                this.props.navigation.dispatch(
                  StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: this.props.routeNameUrl
                      })
                    ]
                  })
                );
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          )}
        </Left>
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        <Right>
          {this.props.rightSide && (
            <Button transparent onPress={this.props.logout}>
              <Text>logout</Text>
            </Button>
          )}
        </Right>
      </Header>
    );
  }
}

export default HeaderLayout;
