/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import gameScreen from './src/gamescreen';
import IntroScreen from './src/introscreen'


const Stack = createStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: Platform.OS == 'android',
        }}>
        <Stack.Screen name="introscreen" component = {IntroScreen} />
        {/*  <Stack.Screen name="game-screen" component={gameScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;