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
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { patientSchema } from '../services/FormValidation';
import { styles } from '../styles/Styles';
import { AntDesign } from '@expo/vector-icons';

const CreatePatientScreen = () => {
  // Manejo de estados para la librería de fechas
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [dateRange, setDateRange] = useState([null, null]);

  const [iconColor, setIconColor] = useState('#50bb52');

  // Define si se muestra el selector de fecha y hora
  // const showDatePicker = () => {
  //   setDatePickerVisibility(true);
  // };

  // const hideDatePicker = () => {
  //   setDatePickerVisibility(false);
  // };

  // Confirma la fecha y hora seleccionada, envía el warn para debuggear
  // const handleConfirm = (date) => {
  //   console.warn('A date has been picked: ', date);
  //   formatDate(date);
  //   hideDatePicker();
  // };

  // Formato a la selección de fecha
  // const formatDate = (rawDate) => {
  //   let date = new Date(rawDate);

  //   let year = date.getFullYear();
  //   let month = date.getMonth();
  //   let day = date.getDate();

  //   return `${day}-${month}-${year}`;
  // };

  // Define el hook de formularios de react

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(patientSchema), // Especifica el resolver para la validación de los inputs
  });

  // Envía los datos a firestore
  const saveNewPatient = async (data) => {
    try {
      await addDoc(collection(db, 'patient'), data);
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
    <ScrollView style={[styles.container]}>
      <Text style={styles.textTitle}>Patient</Text>
      <Text style={styles.textTitleSub}>Patient info</Text>
      <View>
        <Text style={styles.textPlaceholder}>Name</Text>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <View style={styles.inputGroup}>
              <AntDesign name="right" size={20} color={iconColor} />
              <TextInput
                placeholder="Federico Pereyra"
                onChangeText={field.onChange}
                value={field.value}
              />
            </View>
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
            <View style={styles.inputGroup}>
              <AntDesign name="right" size={20} color="#50bb52" />
              <TextInput
                placeholder="fedepereyra@example.com"
                onChangeText={field.onChange}
                value={field.value}
              />
            </View>
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
            <View style={styles.inputGroup}>
              <AntDesign name="right" size={20} color="#50bb52" />
              <TextInput
                placeholder="1133401958"
                onChangeText={field.onChange}
                value={field.value}
              />
            </View>
          )}
        />
        {errors.phone && (
          <Text style={styles.textError}>{errors.phone.message}</Text>
        )}
      </View>
      {/* <View> // Codigo del date picker, aún no implementado.
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
      </View> */}
      <View>
        <Text style={styles.textPlaceholder}>Appointment reason</Text>
        <Controller
          name="reason"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <View style={styles.inputGroup}>
              <AntDesign name="right" size={20} color="#50bb52" />
              <TextInput
                placeholder="Medical check-up"
                onChangeText={field.onChange}
                value={field.value}
              />
            </View>
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
            <View style={styles.inputGroup}>
              <AntDesign name="right" size={20} color="#50bb52" />
              <TextInput
                placeholder="Celiac, low blood presure..."
                onChangeText={field.onChange}
                value={field.value}
              />
            </View>
          )}
        />
        {errors.record && (
          <Text style={styles.textError}>{errors.record.message}</Text>
        )}
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={[
            styles.inputElevation,
            { backgroundColor: '#50bb52', padding: 10, borderRadius: 15 },
          ]}
        >
          <Text
            style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold' }}
          >
            SAVE
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreatePatientScreen;
