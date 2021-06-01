import React, { PureComponent } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Game from './Pages/Game';
import Home from './Pages/Home';
import AutoMatch from './Pages/AutoMatch';
import Login from './Pages/Login';
import AppLoading from './Components/Loading';
import * as Font from 'expo-font';
import GameService from './dist';

const Stack = createStackNavigator();

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      fontsAreLoaded: false,
      sdk: new GameService("minroobapp", "2n2wtgiktr4rgb282rkuko", true)
    }
  }

  async componentWillMount() {
    await Font.loadAsync({
      'vazir': require('./Assets/fonts/Vazir-FD-WOL.ttf'),
      'vazir-bold': require('./Assets/fonts/Vazir-Bold-FD-WOL.ttf')
    });

    this.setState({ fontsAreLoaded: true });
  }

  render() {
    return (
      !this.state.fontsAreLoaded ?
        <AppLoading />
        :
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
            >
              {(props) => <Login sdk={this.state.sdk} props={props} />}
            </Stack.Screen>
            <Stack.Screen
              name="Home"
              options={{ headerShown: false }}
            >
              {(props) => <Home sdk={this.state.sdk} props={props} />}
            </Stack.Screen>
            <Stack.Screen
              name="AutoMatch"
              options={{ headerShown: false }}
            >
              {(props) => <AutoMatch sdk={this.state.sdk} props={props} />}
            </Stack.Screen>
            <Stack.Screen
              name="Game"
              options={{ headerShown: false }}
            >
              {(props) => <Game sdk={this.state.sdk} props={props} />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}


export default App;



