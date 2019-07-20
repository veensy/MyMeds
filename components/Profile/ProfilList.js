import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Right,
  Icon,
  Spinner,
  Text,
  SwipeRow
} from "native-base";
import { Image } from "react-native";
import { size, weight } from "../helpers/images";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import currentUser from "../../queries/currentUser";
import HeaderLayout from "../Header";
import {
  male,
  female,
  cake,
  blood,
  warning,
  trash,
  edit
} from "../helpers/images";
import getAge from "../helpers/getAge";
import { NavigationActions, StackActions } from "react-navigation";

class ProfilList extends Component {
  state = { idx: "", expand: false, showOption: false };
  handleLogout = () => {
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
    return this.props.screenProps.changeLoginState(false);
  };
  expandCard = idx => {
    this.setState({ idx, expand: !this.state.expand });
  };

  renderSexe = sexe => {
    if (sexe === "male") {
      return (
        <Image
          source={male}
          alt="male"
          style={{ alignSelf: "center", width: 30, height: 30 }}
        />
      );
    } else {
      return (
        <Image
          source={female}
          alt="female"
          style={{ alignSelf: "center", width: 30, height: 30 }}
        />
      );
    }
  };
  renderAge = birthday => {
    let date = birthday.slice(0, 10);
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    return getAge(year, month, day);
  };

  meds = (id, meds) => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "Meds",
            params: {
              id,
              meds
            }
          })
        ]
      })
    );
  };
  showOptions = id => {
    console.log(id);
    return (
      <Content>
        <Button>
          <Text>edit</Text>
        </Button>
        <Button>
          <Text>delete</Text>
        </Button>
      </Content>
    );
  };

  renderProfil = () => {
    if (!this.props.data.loading) {
      return this.props.data.currentUser.profils.map((user, idx) => {
        return (
          <Card key={idx}>
            <Content style={{ alignSelf: "flex-end" }}>
              <Button
                transparent
                onPress={() =>
                  this.setState({ showOption: !this.state.showOption })
                }
              >
                <Text>...</Text>
              </Button>
              {this.state.showOption && (
                <Content>{this.showOptions(user.id)}</Content>
              )}
            </Content>
            <CardItem button onPress={() => this.expandCard(idx)}>
              <Body>
                {this.renderSexe(user.sexe)}
                <Text
                  style={{
                    color: "black",
                    alignSelf: "center",
                    marginTop: 6
                  }}
                >
                  {`${user.lastName} ${user.firstName}`}
                </Text>
                {this.state.expand && this.state.idx === idx && (
                  <Content
                    style={{
                      alignSelf: "center"
                    }}
                  >
                    <Button
                      style={{
                        alignSelf: "center",
                        backgroundColor: "none"
                      }}
                      onPress={() => this.expandCard(idx)}
                    >
                      <Image
                        source={size}
                        alt="human-height"
                        style={{ height: 20 }}
                      />
                      <Text
                        style={{
                          color: "black",
                          textAlignVertical: "center"
                        }}
                      >
                        {user.size}
                      </Text>
                      <Image
                        source={weight}
                        alt="human-weight"
                        style={{ height: 20 }}
                      />
                      <Text
                        style={{
                          color: "black",
                          textAlignVertical: "center"
                        }}
                      >
                        {user.weight}
                      </Text>
                    </Button>
                    <Button
                      style={{
                        alignSelf: "center",
                        backgroundColor: "none"
                      }}
                      onPress={() => this.expandCard(idx)}
                    >
                      <Image source={cake} alt="cake" style={{ height: 20 }} />
                      <Text style={{ color: "black" }}>
                        {this.renderAge(user.birthday)}
                      </Text>
                      <Image
                        source={blood}
                        alt="blood"
                        style={{ height: 20 }}
                      />
                      <Text style={{ color: "black" }}>{user.bloodType}</Text>
                    </Button>
                    <Button
                      style={{
                        alignSelf: "center",
                        backgroundColor: "none"
                      }}
                      onPress={() => this.expandCard(idx)}
                    >
                      <Image
                        source={warning}
                        alt="warning"
                        style={{ height: 20 }}
                      />
                      <Text style={{ color: "black" }}> {user.allergies}</Text>
                    </Button>
                    <Button
                      style={{
                        alignSelf: "center"
                      }}
                      onPress={() => this.meds(user.id, user.meds)}
                    >
                      <Text>My meds</Text>
                    </Button>
                  </Content>
                )}
              </Body>
            </CardItem>
          </Card>
        );
      });
    }
  };

  render() {
    // console.log(this.props);
    if (this.props.data.loading) {
      return (
        <Container>
          <Content>
            <Spinner />
          </Content>
        </Container>
      );
    }
    if (this.props.data.error) {
      return (
        <Container>
          <Content>
            <Text>
              <Spinner />
              Error to fetch data
            </Text>
          </Content>
        </Container>
      );
    }

    return (
      <Container>
        <HeaderLayout
          leftSide={true}
          rightSide={true}
          routeNameUrl="MenuUser"
          navigation={this.props.navigation}
          title="Profils"
          logout={this.handleLogout}
        />

        <Content scrollEnabled={false}>{this.renderProfil()}</Content>
      </Container>
    );
  }
}

export default graphql(currentUser)(ProfilList);
