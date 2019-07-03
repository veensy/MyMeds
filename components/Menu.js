import React from "react"
import {Text,Container,Button} from "native-base"
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json

class Menu extends React.Component{
    render(){
        return(
            <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Sign up"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Signup' })
              ],
            }))
          }}
        />
        <Button
          title="Sign in"
          onPress={() => {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Signin' })
              ],
            }))
          }}
        />
      </Container>
        )
    }
}
export default Menu