import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Tabs from './navigation/tabs';
import { SafeAreaProvider } from "react-native-safe-area-context";

const stack = createNativeStackNavigator();

const App = () => {
  return(
    <SafeAreaProvider>
      <NavigationContainer>
        <stack.Navigator initialRouteName="main" screenOptions={{ headerShown: false }}>
          <stack.Screen name="main" component={Tabs} options={{headerShown: false}} />
        </stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;