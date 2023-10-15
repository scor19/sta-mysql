import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CreatePatientScreen from '../screens/CreatePatientScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TurnList from '../screens/TurnList';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Drawer = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'user' : 'user';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'user' : 'user';
          }

          // You can return any component that you like here!
          return <AntDesign name="user" size={24} color="black" />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={WelcomeScreen} />
      <Tab.Screen name="Add appointment" component={CreatePatientScreen} />
      <Tab.Screen name="Turns" component={TurnList} />
    </Tab.Navigator>
  );
};

export default Drawer;
