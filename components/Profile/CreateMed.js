import React, { Component } from "react";
import {
  Button,
  Container,
  Content,
  DatePicker,
  Form,
  Input,
  Item,
  Picker,
  Text,
  Spinner,
  View
} from "native-base";
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
import { StackActions, NavigationActions } from "react-navigation";
import { graphql } from "react-apollo";
import { Image } from "react-native";
import currentUser from "../../queries/currentUser";
import createMed from "../../mutations/createMed";
import HeaderLayout from "../Header";

class CreateMed extends Component {
  state = {
    name: "",
    duration: "",
    startDate: "",
    dosing: "",
    alarm: false,
    unit: "",
    frequencies: [],
    frequency: ""
  };
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
  onNameChange = e => {
    let name = e.nativeEvent.text;
    this.setState({ name });
  };
  onDosingChange = e => {
    let dosing = e.nativeEvent.text;
    this.setState({ dosing });
  };
  onUnitChange = e => {
    let unit = e.nativeEvent.text;
    this.setState({ unit });
  };
  onDailyChange = e => {
    let daily = e.nativeEvent.text;
    let frequencies = daily.split(",");
    this.setState({ frequencies, frequency: daily });
  };
  setDate = value => {
    this.setState({ startDate: value });
  };
  onDurationChange = e => {
    let duration = e.nativeEvent.text;
    this.setState({ duration });
  };
  onSubmit = () => {
    const {
      name,
      duration,
      startDate,
      dosing,
      alarm,
      unit,
      frequencies
    } = this.state;
    let profilId = this.props.navigation.state.params.profilId;
    // console.log(name);
    // console.log(duration);
    // console.log(startDate);
    console.log(dosing, typeof dosing);
    // console.log(alarm);
    // console.log(unit);
    // console.log(frequencies);
    // console.log(profilId);
    if (profilId) {
      this.props
        .createMed(
          name,
          duration,
          startDate,
          dosing,
          alarm,
          unit,
          frequencies,
          profilId
        )
        .then(({ data }) => {
          return this.props.navigation.dispatch(
            StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({
                  routeName: "ProfilList"
                })
              ]
            })
          );
        })
        .catch(e => {
          console.log(e.message);
          console.log(e);
        });
    }
  };
  render() {
    // let test = ["a", "b"];
    // console.log(test);
    // console.log(this.props);
    // console.log(this.state);
    // console.log(typeof this.state.frequencies);

    if (this.props.data.loading) {
      return (
        <Container>
          <Content>
            <Spinner />
          </Content>
        </Container>
      );
    }
    const {
      name,
      duration,
      startDate,
      dosing,
      alarm,
      profilId,
      unit,
      frequencies,
      frequency
    } = this.state;

    return (
      <Container>
        <HeaderLayout
          leftSide={true}
          rightSide={true}
          routeNameUrl="ProfilList"
          navigation={this.props.navigation}
          title="Create Med"
          logout={this.handleLogout}
        />
        <Content>
          <Form>
            <Item>
              <Image source={pill} style={{ height: 20 }} alt="pill" />
              <Input
                placeholder="name"
                onChange={e => this.onNameChange(e)}
                value={name}
              />
            </Item>
            <Item>
              <Image source={dropper} style={{ height: 20 }} alt="dropper" />
              <View style={{ flex: 1, flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Input
                    placeholder="dosage"
                    onChange={e => this.onDosingChange(e)}
                    value={dosing}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    placeholder="unit: gr ,spoon"
                    onChange={e => this.onUnitChange(e)}
                    value={unit}
                  />
                </View>
              </View>
            </Item>
            <Item>
              <Image
                source={daily}
                alt="daily"
                style={{ height: 20, width: 20 }}
              />
              <Input
                placeholder="8h ,13h...separate each hour with coma"
                onChange={e => this.onDailyChange(e)}
                value={frequency}
              />
            </Item>
            <Item>
              <Image
                source={_startDate}
                alt="calendar"
                style={{ height: 20, width: 20 }}
              />
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(1930, 1, 1)}
                // maximumDate={new Date()}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                placeHolderTextStyle={{
                  color: "#575757",
                  marginLeft: -4
                }}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Item>
            <Item>
              <Image source={timesand} alt="timesand" style={{ height: 20 }} />
              <Input
                placeholder="numbers  of  days for this prescription "
                onChange={e => this.onDurationChange(e)}
                value={duration}
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
              <Text>Create</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default graphql(createMed, {
  props: ({ mutate }) => ({
    createMed: (
      name,
      duration,
      startDate,
      dosing,
      alarm,
      unit,
      frequencies,
      profilId
    ) =>
      mutate({
        variables: {
          name,
          duration,
          startDate,
          dosing,
          alarm,
          unit,
          frequencies,
          profilId
        },
        refetchQueries: [{ query: currentUser }]
      })
  })
})(graphql(currentUser)(CreateMed));
