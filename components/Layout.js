import { Container, Content } from "native-base";
import React, { Component } from "react";
import Header from "./Header";
import Menu from "./Menu";
import MenuUser from "./Profile/MenuUser";

class Layout extends Component {
  render() {
    const { islogged } = this.props.screenProps;

    return (
      <Container>
        {!islogged && (
          <Content>
            <Menu
              navigation={this.props.navigation}
              logout={this.props.screenProps.changeLoginState}
              screenProps={{
                changeLoginState: this.props.screenProps.changeLoginState
              }}
            />
          </Content>
        )}
        {islogged && (
          <MenuUser
            navigation={this.props.navigation}
            // logout={this.props.screenProps.changeLoginState}
            screenProps={{
              changeLoginState: this.props.screenProps.changeLoginState
              // islogged: this.state.loggedIn
            }}
          />
        )}
      </Container>
    );
  }
}

export default Layout;
