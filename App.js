import React, { Component } from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-client-preset";
import { setContext } from "apollo-link-context";
import { signIn, signOut, getToken } from "./util";
import Route from "./Route";
import MenuUser from "./components/Profile/MenuUser";

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
  state = { loggedIn: false, data: {} };

  componentDidMount() {
    this._isMounted = true;
  }
  async componentWillMount() {
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
    return (
      <ApolloProvider client={client}>
        {!this.state.loggedIn && (
          <Route
            screenProps={{ changeLoginState: this.handleChangeLoginState }}
          />
        )}
        {this.state.loggedIn && (
          <MenuUser
            screenProps={{ changeLoginState: this.handleChangeLoginState }}
          />
        )}
      </ApolloProvider>
    );
  }
}
export default App;
