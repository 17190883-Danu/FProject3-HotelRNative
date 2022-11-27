import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabs from './navigation/tabs';
import { SafeAreaProvider } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ModalScreen from "./navigation/screens/ModalScreen";

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
        <stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false, }}>
          <stack.Screen name="main" component={Tabs} options={{headerShown: false}} />
          <stack.Screen name="modal" component={ModalScreen} options={{
            presentation: 'transparentModal',
            animation: "none",
            contentStyle: {
              backgroundColor: 'rgba(0,0,0,0.5)',
            }
            }} />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;