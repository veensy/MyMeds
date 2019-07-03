import React, { Component } from "react";
// import { Font ,AppLoading} from 'expo' 
import {
  Root,
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button
} from "native-base";
class Signup extends Component {

  render() {
    return (
        <Container>
          <Content>
            <Form>
              <Item floatingLabel>
                <Icon name="person" />
                <Icon
                  ios="ios-menu"
                  android="md-menu"
                  style={{ fontSize: 20, color: "red" }}
                />
                <Label>First Name</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Last Name</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Icon name="email" />
                <Icon
                  ios="ios-menu"
                  android="md-menu"
                  style={{ fontSize: 20, color: "red" }}
                />
                <Label>Email</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input />
              </Item>
              <Item floatingLabel>
                <Label>Confirm password</Label>
                <Input />
              </Item>
              <Button primary>
                <Text>Signup</Text>
              </Button>
            </Form>
          </Content>
        </Container>
    );
  }
}

export default Signup;
