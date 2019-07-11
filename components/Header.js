import React, { Component } from "react";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
import { StackActions, NavigationActions } from "react-navigation";
class HeaderLayout extends Component {
  render() {
    return (
      <Header>
        {this.props.leftSide && (
          <Left>
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
          </Left>
        )}
        <Body>
          <Title>{this.props.title}</Title>
        </Body>
        {this.props.rightSide && (
          <Right>
            <Button transparent>
              <Icon name="menu" />
            </Button>
          </Right>
        )}
      </Header>
    );
  }
}

export default HeaderLayout;
