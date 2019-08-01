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
  Spinner
} from "native-base";
import { StackActions, NavigationActions } from "react-navigation";
import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Image } from "react-native";
import currentUser from "../../queries/currentUser";
import createProfil from "../../mutations/createProfil";
import HeaderLayout from "../Header";
import {
  blood,
  calendar,
  genders,
  warning,
  _firstName,
  _lastName,
  _size,
  _weight
} from "../helpers/images";

class CreateProfil extends Component {
  state = {
    selected: "",
    birthday: "",
    size: "",
    sexe: "",
    bloodType: "",
    BLOODTYPE: ["O⁺", "O⁻", "A⁺", "A⁻", "B⁺", "B⁻", "AB⁺", "AB⁻"],
    allergies: "",
    firstName: "",
    lastName: "",
    weight: "",
    userId: "",
    message: ""
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

  setDate = value => {
    this.setState({ birthday: value });
  };

  onSizeChange = e => {
    let size = e.nativeEvent.text;
    this.setState({ size });
  };

  onSexeChange = value => {
    this.setState({ sexe: value });
  };

  onBloodTypeChange = value => {
    this.setState({ bloodType: value });
  };

  onAllergiesChange = e => {
    let allergies = e.nativeEvent.text;
    this.setState({ allergies });
  };
  onFirstNameChange = e => {
    let firstName = e.nativeEvent.text;
    this.setState({ firstName });
  };
  onLastNameChange = e => {
    let lastName = e.nativeEvent.text;
    this.setState({ lastName });
  };
  onWeightChange = e => {
    let weight = e.nativeEvent.text;
    this.setState({ weight });
  };
  onSubmit = e => {
    const {
      firstName,
      lastName,
      birthday,
      sexe,
      size,
      weight,
      bloodType,
      allergies
    } = this.state;
    let userId = this.props.data.currentUser.id;

    if (
      !this.props.loading &&
      firstName &&
      lastName &&
      birthday &&
      sexe &&
      userId
    ) {
      this.props
        .createProfil(
          userId,
          firstName,
          lastName,
          birthday,
          sexe,
          weight,
          size,
          bloodType,
          allergies
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
        });
    } else {
      let message = "You must fill out all required fields.";
      this.setState({ message });
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

    const {
      firstName,
      lastName,
      birthday,
      sexe,
      size,
      weight,
      bloodType,
      allergies
    } = this.state;
    return (
      <Container>
        <HeaderLayout
          leftSide={true}
          rightSide={true}
          routeNameUrl="MenuUser"
          navigation={this.props.navigation}
          title="Create profil"
          logout={this.handleLogout}
        />
        <Content>
          <Form>
            <Item>
              <Image source={_firstName} style={{ height: 20 }} alt="weight" />
              <Input
                placeholder="First Name"
                onChange={e => this.onFirstNameChange(e)}
                value={firstName}
              />
            </Item>
            <Item>
              <Image source={_lastName} style={{ height: 20 }} alt="weight" />
              <Input
                placeholder="Last Name"
                onChange={e => this.onLastNameChange(e)}
                value={lastName}
              />
            </Item>
            <Item>
              <Image source={calendar} style={{ height: 20 }} alt="weight" />
              <DatePicker
                defaultDate={new Date()}
                minimumDate={new Date(1930, 1, 1)}
                maximumDate={new Date()}
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
            <Item picker style={{ marginLeft: 14 }}>
              <Image source={genders} style={{ height: 20 }} alt="weight" />
              <Picker
                mode="dropdown"
                placeholder="Sexe"
                placeholderStyle={{ color: "#575757", marginLeft: -8 }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.sexe}
                onValueChange={this.onSexeChange}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Femelle" value="femelle" />
              </Picker>
            </Item>
            <Item>
              <Image source={_size} style={{ height: 20 }} alt="weight" />
              <Input
                placeholder="Size (cm)"
                onChange={e => this.onSizeChange(e)}
                value={size}
              />
            </Item>
            <Item>
              <Image source={_weight} style={{ height: 20 }} alt="weight" />
              <Input
                placeholder="Weight (kg)"
                onChange={e => this.onWeightChange(e)}
                value={weight}
              />
            </Item>
            <Item picker style={{ marginLeft: 14 }}>
              <Image source={blood} style={{ height: 20 }} alt="weight" />
              <Picker
                mode="dropdown"
                placeholder="Blood type"
                placeholderStyle={{ color: "#575757", marginLeft: -8 }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.bloodType}
                onValueChange={this.onBloodTypeChange}
              >
                {this.state.BLOODTYPE.map((blood, id) => {
                  return <Picker.Item label={blood} value={blood} key={id} />;
                })}
              </Picker>
            </Item>
            <Item>
              <Image source={warning} style={{ height: 20 }} alt="weight" />
              <Input
                placeholder="Allergies"
                onChange={e => this.onAllergiesChange(e)}
                value={allergies}
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
            <Text
              style={{
                color: "#ce3c3e",
                alignSelf: "center",
                fontWeight: "bold",
                marginTop: 10
              }}
            >
              {this.state.message}
            </Text>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default graphql(createProfil, {
  props: ({ mutate }) => ({
    createProfil: (
      userId,
      firstName,
      lastName,
      birthday,
      sexe,
      weight,
      size,
      bloodType,
      allergies
    ) =>
      mutate({
        variables: {
          userId,
          firstName,
          lastName,
          birthday,
          sexe,
          weight,
          size,
          bloodType,
          allergies
        },
        refetchQueries: [{ query: currentUser }]
      })
  })
})(graphql(currentUser)(CreateProfil));
