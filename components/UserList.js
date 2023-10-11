import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import db from '../database/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { styles } from '../styles/Styles';
import Patient from './Patient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserList = () => {
  const [patients, setPatients] = useState([]);
  const [storageEmail, setStorageEmail] = useState('');

  const getEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('email');
      console.log('Storage email:', email);
      setStorageEmail(email);
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEmail();
    const collectionRef = collection(db, 'patient');
    const q = query(collectionRef, where('accountEmail', '==', storageEmail));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPatients(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          appointment: doc.data().appointment,
          email: doc.data().email,
          name: doc.data().name,
          phone: doc.data().phone,
          reason: doc.data().reason,
          record: doc.data().record,
        }))
      );
    });
    console.log('Appointments:', patients);
    return unsubscribe;
  }, [storageEmail]);

  return (
    <ScrollView>
      <Text style={[styles.textTitle, { alignSelf: 'center', marginBottom: 20 }]}>Appointments</Text>
      {patients.map((patient) => (
        <Patient key={patient.id} {...patient} />
      ))}
    </ScrollView>
  );
};

export default UserList;