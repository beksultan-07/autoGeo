import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/home/Home';
import Autos from './screens/autos/Autos';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './screens/settings/Settings';
import { Image } from 'react-native';
import homeIcon from './assets/home.png'
import listIcon from './assets/list.png'
import settingsIcon from './assets/setting.png'

const Tab = createBottomTabNavigator();

const App = () => {
  return (
        <NavigationContainer>
          <Tab.Navigator initialRouteName="Home">
            <Tab.Screen 
            name="Home" 
            component={Home} 
            options={{
              headerShown: false ,
              tabBarIcon: ({ focused }) => (
                <Image
                  source={homeIcon}
                  style={{ width: 25, height: 25, tintColor: focused ? '#000000' : '#999999' }}
                />
              ),
            }}
            />
            <Tab.Screen 
              name="Auto's List" 
              component={Autos}
              options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={listIcon}
                  style={{ width: 25, height: 25, tintColor: focused ? '#000000' : '#999999' }}
                />
              ),
            }}/>
            <Tab.Screen 
              name="Settings" 
              component={Settings}
              options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={settingsIcon}
                  style={{ width: 25, height: 25, tintColor: focused ? '#000000' : '#999999' }}
                />
              ),
            }}/>
          </Tab.Navigator>
        </NavigationContainer>
    );
};

export default App;