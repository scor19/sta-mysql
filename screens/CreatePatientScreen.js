import {
  View,
  Button,
  TextInput,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import db from '../database/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from 'react-native-modal-datetime-picker';
import UserDetail from './UserDetail';
import { patientSchema } from '../services/FormValidation';
import { styles } from '../styles/Styles';

const CreatePatientScreen = () => {
  // Manejo de estado para la librería de fechas
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  // Define si se muestra el selector de fecha y hora
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [dateRange, setDateRange] = useState([null, null]);

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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.textTitle}>Patient</Text>
      <Text style={styles.textTitleSub}>Patient info</Text>
      <View>
        <Text style={styles.textPlaceholder}>Name</Text>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              style={styles.inputGroup}
              placeholder="Federico Pereyra"
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
        <Text style={styles.textPlaceholder}>Email (optional)</Text>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              style={styles.inputGroup}
              placeholder="fedepereyra@example.com"
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
              placeholder="1133401958"
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
          <Text style={styles.datePickerStyle}>Select date</Text>
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
              placeholder="Medical check-up"
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
        <Text style={styles.textPlaceholder}>Record (optional)</Text>
        <Controller
          name="record"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              style={styles.inputGroup}
              placeholder="Celiac, low blood presure..."
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
        <Button title="Turn list" color="#32CD32" onPress={<UserDetail />} />
      </View>
    </ScrollView>
  );
};

export default CreatePatientScreen;
