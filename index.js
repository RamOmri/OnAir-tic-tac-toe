/**
 * @format
 */

 import React from 'react';
 import {Provider} from 'react-redux'
 import store from './src/store'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const OnAirApp = () =>
<Provider store={store}>
    <App/>
</Provider>

AppRegistry.registerComponent(appName, () => OnAirApp);
