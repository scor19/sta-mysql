import { ScrollView, Text, View } from 'react-native';
import React from 'react';
import UserList from '../components/UserList';
import { styles } from '../styles/Styles';

const TurnList = () => {
  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <UserList />
    </View>
  );
};

export default TurnList;
