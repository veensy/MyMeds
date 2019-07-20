import { ApolloClient, HttpLink, InMemoryCache } from "apollo-client-preset";
import { setContext } from "apollo-link-context";
import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import Route from "./Route";
import { getToken, signIn, signOut } from "./util";
import logState from "./components/helpers/logState";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" });
const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();

  return {
    ...headers,
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  };
});
const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()

  // dataIdFromObject: o => o.id
});

class App extends Component {
  _isMounted = false;
  state = { loggedIn: false, data: {}, loading: true };
  async componentDidMount() {}
  componentDidMount() {
    this._isMounted = true;
  }
  async componentWillMount() {
    try {
      await Font.loadAsync({
        Roboto: require("./node_modules/native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("./node_modules/native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("./node_modules/native-base/Fonts/Ionicons.ttf")
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log("error loading icon fonts", error);
    }
    const token = await getToken();

    if (token && this._isMounted) {
      this.setState({ loggedIn: true });
    }
  }

  handleChangeLoginState = (loggedIn = false, jwt) => {
    this.setState({ loggedIn });
    if (loggedIn) {
      signIn(jwt);
    } else {
      signOut();
    }
  };

  render() {
    if (this.state.loading) {
      return <AppLoading />;
    }
    return (
      <ApolloProvider client={client}>
        <Route
          screenProps={{
            changeLoginState: this.handleChangeLoginState,
            islogged: this.state.loggedIn
          }}
        />
      </ApolloProvider>
    );
  }
}
export default App;
