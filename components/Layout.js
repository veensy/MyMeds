import React, { Component } from "react";
import { Container, Left, Icon, Button, Body, Title, Right } from "native-base";
import Menu from "./Menu";
import Header from "./Header";

class Layout extends Component {
  render() {
    return (
      <Container>
        <Header
          navigation={this.props.navigation}
          routeNameUrl=""
          title="Menu"
          leftSide={false}
          rightSide={false}
        />
        <Menu navigation={this.props.navigation} />
      </Container>
    );
  }
}

export default Layout;
