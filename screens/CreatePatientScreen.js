import { View, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import db from '../database/firebase';
import { doc, setDoc } from 'firebase/firestore';

const CreatePatientScreen = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const HandleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewPatient = async () => {
    if (state.name === '') {
      alert('Please enter a name');
    } else {
      await setDoc(doc(db, 'patient', 'patient-id'), {
        name: state.name,
        email: state.email,
        phone: state.phone,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Patient Name"
          onChangeText={(value) => HandleTextChange('name', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          onChangeText={(value) => HandleTextChange('email', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Phone"
          onChangeText={(value) => HandleTextChange('phone', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Save" onPress={() => saveNewPatient()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
});

export default CreatePatientScreen;
