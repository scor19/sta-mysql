import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import db from '../database/firebase';
import { doc, collection, getDocs } from 'firebase/firestore';

const UserList = (props) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
  })
  return (
    <View>
      <Text>UserList</Text>
    </View>
  );
};

export default UserList;
