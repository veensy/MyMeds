import {
  Button,
  Container,
  Content,
  DatePicker,
  Form,
  Input,
  Item,
  Picker,
  Text
} from "native-base";
import React, { Component } from "react";
import { Image } from "react-native";
import HeaderLayout from "../Header";
import {
  blood,
  calendar,
  firstName,
  genders,
  lastName,
  size,
  warning,
  weight
} from "../helpers/images";

class CreateUser extends Component {
  state = {
    selected: "",
    date: "",
    size: "0",
    genre: "",
    bloodType: "",
    BLOODTYPE: ["O⁺", "O⁻", "A⁺", "A⁻", "B⁺", "B⁻", "AB⁺", "AB⁻"],
    allergies: ""
  };
  setDate = value => {
    this.setState({ date: value });
  };
  onSizeChange = value => {
    this.setState({
      size: value
    });
  };
  onGenreChange = value => {
    this.setState({ genre: value });
  };
  onBloodTypeChange = value => {
    this.setState({ bloodType: value });
  };
  onAllergiesChange = value => {
    this.setState({ allergies: value });
  };

  render() {
    return (
      <Container>
        <HeaderLayout
          leftSide={true}
          rightSide={true}
          routeNameUrl="Layout"
          navigation={this.props.navigation}
          title="Create user"
        />
        <Content>
          <Form>
            <Item>
              <Image source={firstName} style={{ height: 20 }} alt="weight" />
              <Input placeholder="First Name" />
            </Item>
            <Item>
              <Image source={lastName} style={{ height: 20 }} alt="weight" />
              <Input placeholder="Last Name" />
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
                placeHolderTextStyle={{ color: "#575757", marginLeft: -4 }}
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
                selectedValue={this.state.genre}
                onValueChange={this.onGenreChange}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Femelle" value="femelle" />
              </Picker>
            </Item>
            <Item>
              <Image source={size} style={{ height: 20 }} alt="weight" />
              <Input placeholder="Size (cm)" />
            </Item>
            <Item>
              <Image source={weight} style={{ height: 20 }} alt="weight" />
              <Input placeholder="Weight (kg)" />
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
              <Input placeholder="Allergies" />
            </Item>
            <Button
              primary
              style={{
                marginTop: 20,
                alignSelf: "center"
              }}
              onPress={() => {
                this.props.navigation.dispatch(
                  StackActions.reset({
                    index: 0,
                    actions: [
                      NavigationActions.navigate({
                        routeName: "CreateUser"
                      })
                    ]
                  })
                );
              }}
            >
              <Text>Create</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default CreateUser;
