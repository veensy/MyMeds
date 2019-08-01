import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Spinner,
  Text,
  View
} from "native-base";
import { Image, Alert } from "react-native";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import currentUser from "../../queries/currentUser";
import HeaderLayout from "../Header";
import {
  _size,
  _weight,
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

  deleteProfil = (id, name) => {
    return Alert.alert(
      `Are you sure you want to delete ${name}'s profil ?`,
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: `Delete ${name}`, onPress: () => this.props.deleteProfil(id) }
      ],
      { cancelable: false }
    );
  };
  renderTrash = (id, firstName) => {
    if (id && firstName) {
      return (
        <Button
          transparent
          style={{ width: 34, height: 34 }}
          onPress={e => this.deleteProfil(id, firstName)}
        >
          <Image source={trash} alt="trash" style={{ width: 30, height: 30 }} />
        </Button>
      );
    }
  };
  renderEdit = (
    id,
    firstName,
    lastName,
    birthday,
    bloodType,
    sexe,
    size,
    weight,
    allergies
  ) => {
    const profil = {
      id,
      firstName,
      lastName,
      birthday,
      bloodType,
      sexe,
      size,
      weight,
      allergies
    };
    if (id && firstName) {
      return (
        <Button
          transparent
          style={{ width: 34, height: 34 }}
          onPress={e => this.editProfil(profil)}
        >
          <Image source={edit} alt="trash" style={{ width: 30, height: 30 }} />
        </Button>
      );
    }
  };
  editProfil = profil => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "EditProfil",
            params: {
              profil
            }
          })
        ]
      })
    );
  };
  renderProfil = () => {
    if (!this.props.data.loading) {
      return this.props.data.currentUser.profils.map((user, idx) => {
        return (
          <Card key={idx}>
            <CardItem button onPress={() => this.expandCard(idx)}>
              <Body>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "stretch"
                  }}
                >
                  <View>
                    {this.renderEdit(
                      user.id,
                      user.firstName,
                      user.lastName,
                      user.birthday,
                      user.bloodType,
                      user.sexe,
                      user.size,
                      user.weight,
                      user.allergies
                    )}
                  </View>
                  <View>{this.renderTrash(user.id, user.firstName)}</View>
                </View>
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
                        source={_size}
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
                        source={_weight}
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
      console.log(this.props);
      return (
        <Container>
          <Content>
            <Spinner />
            <Text>Error to fetch data</Text>
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

        <Content scrollEnabled={true}>{this.renderProfil()}</Content>
      </Container>
    );
  }
}

export default graphql(
  gql`
    mutation DeleteProfil($id: String!) {
      deleteProfil(id: $id) {
        id
        firstName
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteProfil: id =>
        mutate({
          variables: {
            id
          },
          refetchQueries: [{ query: currentUser }]
        })
    })
  }
)(graphql(currentUser)(ProfilList));
