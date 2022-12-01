import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabs from './navigation/tabs';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Text,
  TouchableOpacity
} from 'react-native'

import ModalScreen from "./navigation/screens/ModalScreen";
import HotelDetailScreen from "./navigation/screens/HotelDetailScreen";
import BookingScreen from "./navigation/screens/BookingScreen";
import BookingHistoryScreen from "./navigation/screens/BookingHistoryScreen";

const stack = createNativeStackNavigator();

const App = () => {
  const checkUserData = async () => {
    try {
      await AsyncStorage.getItem("user")
      .then((res) => {
        if (res == null) {
          const userData = require("./features/user.json");
          const user = AsyncStorage.setItem("user", JSON.stringify(userData))
        } else{
          // console.log('localStorage user ', res)
        }
      })
      .then((res) => {
        return res
      })
    } catch (e) {
      console.log('error ', e)
    }
  }

  useEffect(() => {
    checkUserData()
  }, [])

  return(
    <SafeAreaProvider>
      <NavigationContainer>
        <stack.Navigator initialRouteName="main">
          <stack.Screen name="main" component={Tabs} options={{headerShown: false}} />
          <stack.Screen name="modal" component={ModalScreen} options={{
            presentation: 'transparentModal',
            animation: "none",
            contentStyle: {
              backgroundColor: 'rgba(0,0,0,0.5)',
            }
            }} />
          <stack.Screen name="Book Room" component={BookingScreen} />
          <stack.Screen name="Hotel Detail" component={HotelDetailScreen}
            initialParams={{
              hotelId: '480872',
              guestNumber: '4',
              checkinDate: '2023-12-12',
              checkoutDate: '2023-12-15',
            }}
          />
          <stack.Screen name="Booking History" component={BookingHistoryScreen}
            options={{
              headerRight: () => {
                return(
                  <TouchableOpacity onPress={() => AsyncStorage.removeItem('bookingHistory')}>
                    <Text style={{color: 'red'}}>Clear History</Text>
                  </TouchableOpacity>
                )
              }
            }}
          />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;