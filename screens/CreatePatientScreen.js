import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import db from '../database/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DateTimePicker from 'react-native-modal-datetime-picker';
import UserDetail from './UserDetail';

// Esquema de validación
const patientSchema = yup.object().shape({
  name: yup.string().required('Please, enter a name'),
  email: yup.string().email().optional(),
  phone: yup
    .number()
    .required('A phone number is required')
    .typeError('Please, enter a number'),
  appointment: yup.date().nullable().default('').optional(),
  reason: yup.string().required('Please, enter an appointment reason'),
  record: yup.string().optional(),
});

const CreatePatientScreen = () => {
  // Manejo de estado para la librería de fechas
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    formatDate(date);
    hideDatePicker();
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    return `${day}-${month}-${year}`;
  };

  // Resolver para validación de Yup
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientSchema), // Especifica el resolver aquí
  });

  // Envía los datos a firestore
  const saveNewPatient = async (data) => {
    try {
      await setDoc(doc(db, 'patient', 'patient-id'), data);
      Alert.alert(
        'Patient added succesfully',
        'The patient was saved in the database',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      );
    } catch (error) {
      console.error('Error saving the patient', error);
    }
  };

  const onSubmit = (data) => {
    saveNewPatient(data);
  };

  // const validate = () => {
  //   if (!state.name) {
  //     // Alerta ANDROID
  //     Alert.alert('Nombre', 'Please, enter a name', [
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ]);
  //   }
  //   if (state.email) {

  //   }
  // };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textTitle}>Patient</Text>
      <Text style={styles.textTitleSub}>Enter Patient Info</Text>
      <View>
        <Text style={styles.textPlaceholder}>Name</Text>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              style={styles.inputGroup}
              placeholder="Name"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.textError}>{errors.name.message}</Text>
        )}
      </View>
      <View>
        <Text style={styles.textPlaceholder}>Email</Text>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              style={styles.inputGroup}
              placeholder="Email (optional)"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.textError}>{errors.email.message}</Text>
        )}
      </View>
      <View>
        <Text style={styles.textPlaceholder}>Phone number</Text>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              style={styles.inputGroup}
              placeholder="Phone"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        {errors.phone && (
          <Text style={styles.textError}>{errors.phone.message}</Text>
        )}
      </View>
      <View>
        <Text style={styles.textPlaceholder}>Appointment date</Text>
        <TouchableOpacity onPress={showDatePicker}>
          <Text style={styles.inputGroup}>Appointment date</Text>
        </TouchableOpacity>
        <Controller
          name="appointment"
          control={control}
          defaultValue={new Date()}
          render={({ field }) => (
            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="datetime"
              onChange={(e) => {
                setDateRange(e);
                field.onChange(e);
              }}
              selected={field.value}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          )}
        />
        {errors.appointment && (
          <Text style={styles.textError}>{errors.appointment.message}</Text>
        )}
      </View>
      <View>
        <Text style={styles.textPlaceholder}>Appointment reason</Text>
        <Controller
          name="reason"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              style={styles.inputGroup}
              placeholder="Appointment reason"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        {errors.reason && (
          <Text style={styles.textError}>{errors.reason.message}</Text>
        )}
      </View>
      <View>
        <Text style={styles.textPlaceholder}>Record</Text>
        <Controller
          name="record"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              style={styles.inputGroup}
              placeholder="Record (optional)"
              onChangeText={field.onChange}
              value={field.value}
            />
          )}
        />
        {errors.record && (
          <Text style={styles.textError}>{errors.record.message}</Text>
        )}
      </View>
      <View style={styles.inputGroup}>
        <Button
          style={styles.buttonGroup}
          title="Save"
          color="#32CD32"
          onPress={handleSubmit(onSubmit)}
        />
        <Button title="Ver turnos" color="#32CD32" onPress={<UserDetail />} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  textPlaceholder: {
    color: 'green',
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 2,
  },
  buttonGroup: {
    padding: 0,
    marginBottom: 15,
  },
  textTitle: {
    flex: 1,
    color: 'black',
    fontSize: 45,
    fontWeight: 'bold',
  },
  textTitleSub: {
    flex: 1,
    color: 'gray',
    marginVertical: 10,
  },
  textError: {
    color: 'red',
  },
});

export default CreatePatientScreen;
