/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import LoginScreen from './navigation/screens/LoginScreen';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './store'

const Root = () => (
    <Provider store={store}>
        {/* <LoginScreen /> */}
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Root);
