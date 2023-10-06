import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import UserList from '../components/UserList';
import { styles } from '../styles/Styles';

const TurnList = () => {
  return (
    <ScrollView contentContainerStyle={{padding: 30}}>
      <UserList />
    </ScrollView>
  );
};

export default TurnList;
