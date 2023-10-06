import { View, Text, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import db from '../database/firebase';
import {
  doc,
  collection,
  getDocs,
  onSnapshot,
  QuerySnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { styles } from '../styles/Styles';
import Patient from './Patient';

const UserList = (props) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, 'patient');
    const q = query(collectionRef);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setPatients(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          phone: doc.data().phone,
          reason: doc.data().reason,
          record: doc.data().record,
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <View>
      <Text style={styles.textTitle}>Patients</Text>
      {patients.map((patient) => (
        <Patient key={patient.id} {...patient} />
      ))}
    </View>
  );
};

export default UserList;
