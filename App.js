import React, { PureComponent } from 'react';
import Game from './Pages/Game';
import AppLoading from './Components/Loading';
import * as Font from 'expo-font';

class App extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      fontsAreLoaded: false,
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
        <Game />

    );
  }
}


export default App;



