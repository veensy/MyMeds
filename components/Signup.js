import React, { Component } from "react";
import { StackActions, NavigationActions } from "react-navigation";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button
} from "native-base";
import HeaderLayout from "./Header";

class Signup extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    showError: false,
    errorMessage: { email: "", password: "", isValid: false }
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.screenProps.islogged !== prevProps.screenProps.islogged) {
      if (this.props.screenProps.islogged) {
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
      }
    }
  }
  onEmailChange = e => {
    let email = e.nativeEvent.text;
    this.setState({ email });
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      let error = "Invalid...";
      this.setState({ errorMessage: { email: error } });
    } else {
      let error = "Valid...";
      this.setState({ errorMessage: { email: error, isValid: true } });
    }
  };
  onPasswordChange = e => {
    let password = e.nativeEvent.text;
    this.setState({ password });
  };
  onConfirmPasswordChange = e => {
    let confirmPassword = e.nativeEvent.text;
    this.setState({ confirmPassword });
  };
  onSubmit = e => {
    const { email, password, confirmPassword } = this.state;
    if (email && password && password === confirmPassword) {
      this.props
        .signup(email, password)
        .then(({ data }) => {
          return this.props.screenProps.changeLoginState(true, data.signup.jwt);
        })
        .catch(e => {
          // If the error message contains email or password we'll assume that's the error.
          if (/email/i.test(e.message)) {
            this.setState({ emailError: true });
          }
          if (/password/i.test(e.message)) {
            this.setState({ passwordError: true });
          }
        });
    }
    if (password !== confirmPassword) {
      let error = "You must provide the same password";
      this.setState({ showError: error });
    }
    if (!email || !password || !confirmPassword) {
      let error = "You must fill out all required fields";
      this.setState({ showError: error });
    }
  };
  render() {
    return (
      <Container>
        <HeaderLayout
          leftSide={true}
          rightSide={true}
          routeNameUrl="Layout"
          navigation={this.props.navigation}
          title="Sign up"
          rightText=""
        />
        <Content>
          <Form>
            <Item floatingLabel>
              <Icon name="at" />
              <Label>Email</Label>
              <Input
                onChange={e => this.onEmailChange(e)}
                value={this.state.email}
              />
            </Item>
            <Text
              style={{
                color: this.state.errorMessage.isValid ? "#15b386" : "#ce3c3e",
                fontWeight: "bold",
                marginLeft: 40
              }}
            >
              {this.state.errorMessage.email}
            </Text>
            <Item floatingLabel>
              <Icon name="lock" />
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChange={e => this.onPasswordChange(e)}
                value={this.state.password}
              />
            </Item>
            <Item floatingLabel>
              <Icon name="lock" />
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChange={e => this.onConfirmPasswordChange(e)}
                value={this.state.confirmPassword}
              />
            </Item>
            <Text
              style={{
                color: "#ce3c3e",
                fontWeight: "bold",
                marginLeft: 40,
                marginTop: 20
              }}
            >
              {this.state.showError}
            </Text>
            <Button
              primary
              style={{
                marginTop: 20,
                alignSelf: "center"
              }}
              onPress={this.onSubmit}
            >
              <Text>Sign up</Text>
              <Icon name="checkmark" />
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default graphql(
  gql`
    mutation Signup($email: String!, $password: String!) {
      signup(email: $email, password: $password) {
        id
        email
        jwt
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      signup: (email, password) => mutate({ variables: { email, password } })
    })
  }
)(Signup);
