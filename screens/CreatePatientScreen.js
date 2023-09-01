import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import db from '../database/firebase';
import { doc, setDoc } from 'firebase/firestore';

const CreatePatientScreen = () => {
  const [state, setState] = useState({
    name: '',
    email: '',
    birthdate: '',
    phone: '',
  });

  const HandleTextChange = (name, value) => {
    setState({ ...state, [name]: value });
  };

  const saveNewPatient = async () => {
    if (!state.name) {
      // Alerta ANDROID
      Alert.alert('Nombre', 'Por favor, ingrese un nombre', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      await setDoc(doc(db, 'patient', 'patient-id'), {
        name: state.name,
        email: state.email,
        birthdate: state.birthdate,
        phone: state.phone,
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textTitle}>Patient info:</Text>
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
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
        <TextInput
          placeholder="Birthdate"
          onChangeText={(value) => HandleTextChange('birthdate', value)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Save" color="#b8ee11" onPress={() => saveNewPatient()} />
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
  textTitle: {
    flex: 1,
    marginBottom: 15,
    fontSize: 20,
    fontWeight: '600',
  },
});

export default CreatePatientScreen;
