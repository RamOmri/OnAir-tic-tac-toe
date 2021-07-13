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

import GameScreen from './src/gamescreen';
import IntroScreen from './src/introscreen'
import settingsscreen from './src/settingsscreen';


const Stack = createStackNavigator();
const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: Platform.OS == 'android',
        }}>
        <Stack.Screen name="intro-screen" component = {IntroScreen} />
        <Stack.Screen name="settings-screen" component = {settingsscreen} />
         <Stack.Screen name="game-screen" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
