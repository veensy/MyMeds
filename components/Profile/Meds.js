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
  Text
} from "native-base";
import { NavigationActions, StackActions } from "react-navigation";
import { Image } from "react-native";
import HeaderLayout from "../Header";
import {
  pill,
  timersand,
  dropper,
  daily,
  startDate,
  duration,
  timesand
} from "../helpers/images";

class Meds extends Component {
  state = { idx: "", expand: false, color: "" };
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

  renderFrequency = (freq, idx) => {
    if (freq[0]) {
      return freq[0].hour.map((h, i) => {
        return <Text key={i}>{`${h}h  `}</Text>;
      });
    }
  };
  renderStartDate = startDate => {
    let date = startDate.slice(0, 10);
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let dateFr = `${day}-${month}-${year}`;
    return dateFr;
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
  renderMed = () => {
    return this.props.navigation.state.params.meds.map((med, idx) => {
      var color = this.handleStateDate(med.startDate);
      //   this.setState({ color });
      return (
        <Card key={idx}>
          <CardItem
            button
            onPress={() => this.expandCard(idx)}
            style={{ backgroundColor: color }}
          >
            <Body>
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
                      source={startDate}
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
    console.log(this.props.navigation.state.params.meds.length, "meds");
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
        <Content>{this.renderMed()}</Content>
      </Container>
    );
  }
}

export default Meds;
