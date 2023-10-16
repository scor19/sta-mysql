import { View } from 'react-native';
import React from 'react';
import UserList from '../components/UserList';

const TurnList = () => {
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <UserList />
    </View>
  );
};

export default TurnList;
