import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePatientScreen from './screens/CreatePatientScreen';
import UserDetail from './screens/UserDetail';
import UserList from './screens/UserList';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="CreatePatientScreen"
        component={CreatePatientScreen}
      />
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
