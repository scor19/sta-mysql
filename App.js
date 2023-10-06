import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Se importan las screens
import Drawer from './navigation/Drawer';
import TurnList from './screens/TurnList';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import WelcomeScreen from './screens/WelcomeScreen';
import UserDetail from './screens/UserDetail';
import CreatePatientScreen from './screens/CreatePatientScreen';
import { User, onAuthStateChanged } from 'firebase/auth';
import { FIREBASE_AUTH } from './database/firebase';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator screenOptions={{ headerShown: false }}>
      <InsideStack.Screen name="Drawer" component={Drawer} />
      <InsideStack.Screen
        name="CreatePatientScreen"
        component={CreatePatientScreen}
      />
      <InsideStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <InsideStack.Screen name="TurnList" component={TurnList} />
      <InsideStack.Screen name="UserDetail" component={UserDetail} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log('user', user);
      setUser(user);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        {user ? (
          <Stack.Screen name="Inside" component={InsideLayout} />
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
