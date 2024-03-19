import React from 'react';
import Home from './components/Home';
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts } from 'expo-font';

const Tab = createBottomTabNavigator();

export default function App() {

  const [loaded] = useFonts({
    'Angkor-Regular': require('./assets/fonts/Angkor-Regular.ttf'),
    'MochiyPopPOne-Regular': require('./assets/fonts/MochiyPopPOne-Regular.ttf'),
  });

  if(!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'information'
                : 'information-outline';
            } else if (route.name === 'Gameboard') {
              iconName = focused
                ? 'dice-multiple'
                : 'dice-multiple-outline';
            } else if (route.name === 'Scoreboard') {
            iconName = focused
              ? 'view-list'
              : 'view-list-outline';
            }

            // You can return any component that you like here!
            return <MaterialCommunityIcons
               name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FFEE0B',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: {
            backgroundColor: '#C91D1D',
            borderTopColor: '#C91D1D',
          },
          tabBarLabelStyle: {
            fontFamily: 'Angkor-Regular',
          },
          headerStyle: {
            backgroundColor: '#C91D1D',
          },
          headerTitleStyle: {
            color: '#FFFA86',
            fontFamily: 'Angkor-Regular',
          },
          
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{tabBarStyle: {display: "none"}}} />
        <Tab.Screen name="Gameboard" component={Gameboard} />
        <Tab.Screen name="Scoreboard" component={Scoreboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}