import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from './navigation/tabs';
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return(
    <SafeAreaProvider>
      <NavigationContainer>
          <Tabs/>
      </NavigationContainer>
    </SafeAreaProvider>
    
  );
}

export default App;