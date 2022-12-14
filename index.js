/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import BookingScreen from './navigation/screens/BookingScreen';
import HotelDetailScreen from './navigation/screens/HotelDetailScreen';
import {name as appName} from './app.json';
import { Provider } from 'react-redux';
import store from './store'

const Root = () => (
    <Provider store={store}>
        {/* <HotelDetailScreen /> */}
        {/* <BookingScreen /> */}
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Root);
