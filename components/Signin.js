import React from "react";
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
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class Signin extends React.Component {
  state = {
    email: "",
    password: "",
    errorMessage: { email: "", password: "", isValid: false }
  };
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
  onSubmit = e => {
    const { email, password } = this.state;
    if (email && password) {
      this.props
        .login(email, password)
        .then(({ data }) => {
          return this.props.screenProps.changeLoginState(true, data.login.jwt);
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
      // if()
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
          title="Sign in"
        />
        <Content>
          <Form>
            <Item floatingLabel>
              <Icon name="at" />
              <Label>
                Email :
                <Text
                  style={{
                    color: this.state.errorMessage.isValid
                      ? "#15b386"
                      : "#ce3c3e",
                    fontWeight: "bold",
                    marginLeft: 10
                  }}
                >
                  {this.state.errorMessage.email}
                </Text>
              </Label>
              <Input
                onChange={e => this.onEmailChange(e)}
                value={this.state.email}
              />
            </Item>
            <Item floatingLabel>
              <Icon name="lock" />
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChange={e => this.onPasswordChange(e)}
                value={this.state.password}
              />
            </Item>
            <Button
              primary
              style={{
                marginTop: 20,
                alignSelf: "center"
              }}
              onPress={this.onSubmit}
            >
              <Text>Enter</Text>
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
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        id
        email
        jwt
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      login: (email, password) => mutate({ variables: { email, password } })
    })
  }
)(Signin);
