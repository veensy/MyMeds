import React, { Component } from "react";
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Icon,
  Spinner,
  Text,
  Badge,
  View,
  Form,
  Picker
} from "native-base";
import { NavigationActions, StackActions } from "react-navigation";
import { Image, Alert } from "react-native";
import HeaderLayout from "../Header";
import {
  pill,
  timersand,
  dropper,
  daily,
  _startDate,
  duration,
  timesand,
  trash,
  edit,
  plus
} from "../helpers/images";
import { graphql } from "react-apollo";
import currentUser from "../../queries/currentUser";
import gql from "graphql-tag";

class Meds extends Component {
  state = { idx: "", expand: false, color: "", Meds: [] };
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
  componentDidMount() {
    const med = this.props.data.currentUser.profils.filter(
      profil => profil.id === this.props.navigation.state.params.id
    );
    this.setState({ Meds: med[0].meds });
  }

  componentDidUpdate(prevProps, prevState) {
    const med = this.props.data.currentUser.profils.filter(
      profil => profil.id === this.props.navigation.state.params.id
    );
    if (prevState.Meds.length !== med[0].meds.length) {
      this.setState({ Meds: med[0].meds });
    }
  }

  expandCard = idx => {
    this.setState({ idx, expand: !this.state.expand });
  };

  renderFrequency = (freq, idx) => {
    if (freq) {
      return freq.map((h, i) => {
        return <Text key={i}>{`${h} `}</Text>;
      });
    }
  };
  renderStartDate = startDate => {
    if (startDate) {
      let date = startDate.slice(0, 10);
      let year = date.slice(0, 4);
      let month = date.slice(5, 7);
      let day = date.slice(8, 10);
      let dateFr = `${day}-${month}-${year}`;
      return dateFr;
    }
  };
  handleStateDate = startDate => {
    let today = new Date(Date.now()).toLocaleDateString();
    let s_date = new Date(startDate).toLocaleDateString();
    let st_date = new Date(startDate);
    let ad_date = st_date.setDate(st_date.getDate() + duration);
    let e_date = new Date(ad_date).toLocaleDateString();
    let color = null;

    if (s_date > today) {
      color = "rgba(243, 156, 18, .2)";
    }
    if (today >= s_date && today <= e_date) {
      color = "rgba(0, 179, 134,.2)";
    }
    if (today > e_date) {
      color = "rgba(189, 195, 199, .2)";
    }
    return color;
  };
  renderEdit = med => {
    const {
      id,
      name,
      duration,
      startDate,
      dosing,
      unit,
      alarm,
      profilId,
      frequencies
    } = med;
    // console.log(id);

    if (id) {
      return (
        <Button
          transparent
          style={{ width: 34, height: 34 }}
          onPress={e => this.editMed(med)}
        >
          <Image source={edit} alt="trash" style={{ width: 30, height: 30 }} />
        </Button>
      );
    }
  };
  editMed = med => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "EditMed",
            params: {
              med
            }
          })
        ]
      })
    );
  };
  renderTrash = (id, firstName) => {
    if (id) {
      return (
        <Button
          transparent
          style={{ width: 34, height: 34 }}
          onPress={e => this.deleteMed(id, firstName)}
        >
          <Image source={trash} alt="trash" style={{ width: 30, height: 30 }} />
        </Button>
      );
    }
  };
  deleteMed = (id, name) => {
    return Alert.alert(
      `Are you sure you want to delete this med ?`,
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: `Delete ${name}`, onPress: () => this.deleteAndRefetch(id) }
      ],
      { cancelable: false }
    );
  };
  deleteAndRefetch = id => {
    this.props.deleteMed(id);
  };

  createMed = profilId => {
    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: "CreateMed",
            params: {
              profilId
            }
          })
        ]
      })
    );
  };

  renderMed = () => {
    return this.state.Meds.map((med, idx) => {
      var color = this.handleStateDate(med.startDate);
      return (
        <Card key={idx} scrollEnabled={true}>
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
                  <Badge style={{ backgroundColor: color }}>
                    <Icon
                      name="star"
                      style={{ fontSize: 15, color: "#fff", lineHeight: 20 }}
                    />
                  </Badge>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row-reverse",
                    alignItems: "flex-end"
                  }}
                >
                  <View>{this.renderEdit(med)}</View>
                  <View>{this.renderTrash(med.id, med.name)}</View>
                </View>
              </View>

              <Image
                source={pill}
                alt="pill"
                style={{ alignSelf: "center", width: 30, height: 30 }}
              />
              <Text
                style={{ color: "black", alignSelf: "center", marginTop: 6 }}
              >
                {med.name}
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
                      source={dropper}
                      alt="dropper"
                      style={{ height: 20 }}
                    />
                    <Text
                      style={{ color: "black", textAlignVertical: "center" }}
                    >
                      {`${med.dosing}  ${med.unit}`}
                    </Text>
                    <Image
                      source={daily}
                      alt="daily"
                      style={{ height: 20, width: 20 }}
                    />
                    <Text
                      style={{ color: "black", textAlignVertical: "center" }}
                    >
                      {this.renderFrequency(med.frequencies, idx)}
                    </Text>
                  </Button>
                  <Button
                    style={{
                      alignSelf: "center",
                      backgroundColor: "none"
                    }}
                    onPress={() => this.expandCard(idx)}
                  >
                    <Image
                      source={_startDate}
                      alt="calendar"
                      style={{ height: 20, width: 20 }}
                    />
                    <Text
                      style={{ color: "black", textAlignVertical: "center" }}
                    >
                      {this.renderStartDate(med.startDate)}
                    </Text>
                    <Image
                      source={timesand}
                      alt="timesand"
                      style={{ height: 20 }}
                    />
                    <Text
                      style={{ color: "black", textAlignVertical: "center" }}
                    >
                      {` ${med.duration} ${med.duration > 1 ? "days" : "day"}`}
                    </Text>
                  </Button>
                </Content>
              )}
            </Body>
          </CardItem>
        </Card>
      );
    });
  };

  render() {
    const profilId = this.props.navigation.state.params.meds[0].profilId;
    if (this.props.navigation.state.params.meds.length === 0) {
      return (
        <Container>
          <HeaderLayout
            leftSide={true}
            rightSide={true}
            routeNameUrl="ProfilList"
            navigation={this.props.navigation}
            title="Meds"
            logout={this.handleLogout}
          />
          <Content>
            <Text>This Profil don't have any meds yet</Text>
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <HeaderLayout
          leftSide={true}
          rightSide={true}
          routeNameUrl="ProfilList"
          navigation={this.props.navigation}
          title="Meds"
          logout={this.handleLogout}
        />
        <Content>
          <Card scrollEnabled={false}>
            <CardItem
              button
              onPress={() => this.createMed(profilId)}
              style={{ alignSelf: "center" }}
            >
              <Image
                source={plus}
                style={{
                  height: 30,
                  width: 30,
                  alignSelf: "center"
                }}
                alt="plus"
              />
            </CardItem>
          </Card>
          {this.renderMed()}
        </Content>
      </Container>
    );
  }
}

export default graphql(
  gql`
    mutation DeleteMed($id: String!) {
      deleteMed(id: $id) {
        id
        name
      }
    }
  `,
  {
    props: ({ mutate }) => ({
      deleteMed: id =>
        mutate({
          variables: { id },
          refetchQueries: [{ query: currentUser }]
        })
    })
  }
)(graphql(currentUser)(Meds));
