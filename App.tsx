import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/home/Home';
import Autos from './screens/autos/Autos';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './screens/settings/Settings';


const Tab = createBottomTabNavigator();

const App = () => {
  return (
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
            <Tab.Screen name="Auto's List" component={Autos}/>
            <Tab.Screen name="Settings" component={Settings}/>
          </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;