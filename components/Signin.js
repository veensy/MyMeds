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
import { StackActions, NavigationActions } from "react-navigation";
import HeaderLayout from "./Header";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import logState from "./helpers/logState";

class Signin extends React.Component {
  state = {
    showError: false,
    email: "",
    password: "",
    errorMessage: {
      email: "",
      password: "",
      isValid: false
    }
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
            this.setState({
              showError: " The email or password you entered is incorrect !!!"
            });
          }
          if (/password/i.test(e.message)) {
            this.setState({
              showError: " The email or password you entered is incorrect !!!"
            });
          }
        });
      // if()
    }
    if (!email || !password) {
      this.setState({ showError: "You must provide an email and password" });
    }
  };
  render() {
    const { email, password, showError } = this.state;

    const { isValid } = this.state.errorMessage;
    return (
      <Container>
        <HeaderLayout
          leftSide={true}
          rightSide={true}
          routeNameUrl="Layout"
          navigation={this.props.navigation}
          title="Sign in"
          rightText=""
        />
        <Content>
          <Form>
            <Item floatingLabel>
              <Icon name="at" />
              <Label>
                Email :
                <Text
                  style={{
                    color: isValid ? "#15b386" : "#ce3c3e",
                    fontWeight: "bold",
                    marginLeft: 10
                  }}
                >
                  {this.state.errorMessage.email}
                </Text>
              </Label>
              <Input onChange={e => this.onEmailChange(e)} value={email} />
            </Item>
            <Item floatingLabel>
              <Icon name="lock" />
              <Label>Password</Label>
              <Input
                secureTextEntry={true}
                onChange={e => this.onPasswordChange(e)}
                value={password}
              />
            </Item>

            {showError && (
              <Content>
                <Text
                  style={{
                    color: "#ce3c3e",
                    fontWeight: "bold",
                    marginTop: 20,
                    textAlign: "center"
                  }}
                >
                  {showError}
                </Text>
                <Button
                  transparent
                  style={{ alignSelf: "center" }}
                  onPress={() => {
                    this.props.navigation.dispatch(
                      StackActions.reset({
                        index: 0,
                        actions: [
                          NavigationActions.navigate({
                            routeName: "Signup"
                          })
                        ]
                      })
                    );
                  }}
                >
                  <Text>go to sign in ...</Text>
                </Button>
              </Content>
            )}
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
