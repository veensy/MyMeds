import React, { Component } from "react";
import {
  Container,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Icon,
  Button,
  Picker,
  DatePicker
} from "native-base";
import HeaderLayout from "../Header";
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
          routeNameUrl="MenuUser"
          navigation={this.props.navigation}
          title="Create user"
        />
        <Content>
          <Form>
            <Item floatingLabel>
              <Icon name="person" />
              <Label style={{ marginLeft: 30, color: "#808080" }}>
                First Name
              </Label>
              <Input />
            </Item>
            <Item floatingLabel>
              <Icon name="person" />
              <Label style={{ marginLeft: 30, color: "#808080" }}>
                Last Name
              </Label>
              <Input />
            </Item>
            <Item>
              <Icon name="calendar" />
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
                textStyle={{ color: "#808080" }}
                placeHolderTextStyle={{ color: "#808080", marginLeft: 20 }}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Item>
            <Item picker style={{ marginLeft: 18 }}>
              <Icon name="male" />
              <Icon style={{ marginLeft: -12 }} name="female" />
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Sexe"
                placeholderStyle={{ color: "#808080", marginLeft: -4 }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.genre}
                onValueChange={this.onGenreChange}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Femelle" value="femelle" />
              </Picker>
            </Item>
            <Item floatingLabel>
              <Icon name="resize" />
              <Label style={{ marginLeft: 30, color: "#808080" }}>
                Size (cm)
              </Label>
              <Input />
            </Item>
            <Item picker style={{ marginLeft: 18 }}>
              <Icon name="water" />
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Blood type"
                placeholderStyle={{ color: "#808080", marginLeft: 14 }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.bloodType}
                onValueChange={this.onBloodTypeChange}
              >
                {this.state.BLOODTYPE.map((blood, id) => {
                  return <Picker.Item label={blood} value={blood} key={id} />;
                })}
              </Picker>
            </Item>
            <Item floatingLabel>
              <Icon name="warning" />
              <Label style={{ color: "#808080", marginLeft: 30 }}>
                Allergies
              </Label>
              <Input />
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
